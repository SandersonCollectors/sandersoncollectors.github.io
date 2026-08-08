(function () {
  const root = document.getElementById("nexusDirectory");
  if (!root) return;

  const searchInput = document.getElementById("nexusSearch");
  const filters = document.getElementById("nexusFilters");
  const stats = document.getElementById("nexusStats");
  const noResults = document.getElementById("nexusNoResults");
  const grid = document.getElementById("nexusGrid");

  const CATEGORY_ORDER = [
    "guests",
    "exhibitors",
    "authors",
    "artists",
    "panelists",
    "other",
    "not-attending",
  ];

  const categoryRank = CATEGORY_ORDER.reduce((map, category, index) => {
    map[category] = index;
    return map;
  }, Object.create(null));

  const knownFilters = new Set(["all", ...CATEGORY_ORDER]);

  function cardCategories(card) {
    const raw = card.dataset.categories || card.dataset.category || "";
    return raw
      .split(/[\s,]+/)
      .map((value) => value.trim())
      .filter(Boolean);
  }

  function primaryRank(card) {
    const ranks = cardCategories(card).map(
      (category) => categoryRank[category] ?? Number.MAX_SAFE_INTEGER
    );
    return ranks.length ? Math.min(...ranks) : Number.MAX_SAFE_INTEGER;
  }

  const cards = Array.from(grid.querySelectorAll(".nexus-card")).sort(
    (a, b) => {
      const rankDiff = primaryRank(a) - primaryRank(b);
      if (rankDiff !== 0) return rankDiff;

      return (a.dataset.name || "").localeCompare(b.dataset.name || "", undefined, {
        sensitivity: "base",
        numeric: true,
      });
    }
  );

  // Re-append in sorted/group order so layout is independent of YAML order.
  cards.forEach((card) => grid.appendChild(card));

  const total = cards.length;
  let currentFilter = "all";
  let currentSearchQuery = "";

  function readStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get("q") || "").trim();
    const category = (params.get("category") || "all").trim().toLowerCase();

    currentSearchQuery = q;
    currentFilter = knownFilters.has(category) ? category : "all";
  }

  function writeStateToURL() {
    const params = new URLSearchParams();
    if (currentSearchQuery) params.set("q", currentSearchQuery);
    if (currentFilter !== "all") params.set("category", currentFilter);

    const query = params.toString();
    const next =
      window.location.pathname + (query ? `?${query}` : "") + window.location.hash;

    const current = window.location.pathname + window.location.search + window.location.hash;
    if (next !== current) {
      history.replaceState(null, "", next);
    }
  }

  function syncFilterButtons() {
    filters.querySelectorAll(".nexus-filter-btn").forEach((btn) => {
      const isActive = (btn.getAttribute("data-filter") || "all") === currentFilter;
      btn.classList.toggle("active", isActive);
    });
  }

  function applyFilters({ updateURL = true } = {}) {
    const query = currentSearchQuery.toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const categories = cardCategories(card);
      const matchesFilter =
        currentFilter === "all" || categories.includes(currentFilter);
      const matchesSearch =
        !query ||
        (card.dataset.name || "").includes(query) ||
        (card.dataset.tags || "").includes(query);
      const show = matchesFilter && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    stats.textContent = `Showing ${visible} of ${total} entries`;
    noResults.hidden = visible !== 0;

    if (updateURL) writeStateToURL();
  }

  function restoreFromURL() {
    readStateFromURL();
    searchInput.value = currentSearchQuery;
    syncFilterButtons();
    applyFilters({ updateURL: false });
  }

  searchInput.addEventListener("input", () => {
    currentSearchQuery = searchInput.value.trim();
    applyFilters();
  });

  filters.addEventListener("click", (event) => {
    const btn = event.target.closest(".nexus-filter-btn");
    if (!btn) return;

    currentFilter = btn.getAttribute("data-filter") || "all";
    if (!knownFilters.has(currentFilter)) currentFilter = "all";
    syncFilterButtons();
    applyFilters();
  });

  window.addEventListener("popstate", restoreFromURL);

  restoreFromURL();
  writeStateToURL();
})();
