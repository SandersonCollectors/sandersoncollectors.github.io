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
    "other",
    "not-attending",
  ];

  const categoryRank = CATEGORY_ORDER.reduce((map, category, index) => {
    map[category] = index;
    return map;
  }, Object.create(null));

  const cards = Array.from(grid.querySelectorAll(".nexus-card")).sort(
    (a, b) => {
      const rankA = categoryRank[a.dataset.category] ?? Number.MAX_SAFE_INTEGER;
      const rankB = categoryRank[b.dataset.category] ?? Number.MAX_SAFE_INTEGER;
      if (rankA !== rankB) return rankA - rankB;

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

  function applyFilters() {
    const query = (searchInput.value || "").trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const matchesFilter =
        currentFilter === "all" || card.dataset.category === currentFilter;
      const matchesSearch =
        !query || (card.dataset.name || "").includes(query);
      const show = matchesFilter && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    stats.textContent = `Showing ${visible} of ${total} entries`;
    noResults.hidden = visible !== 0;
  }

  searchInput.addEventListener("input", applyFilters);

  filters.addEventListener("click", (event) => {
    const btn = event.target.closest(".nexus-filter-btn");
    if (!btn) return;

    filters.querySelectorAll(".nexus-filter-btn").forEach((el) => {
      el.classList.remove("active");
    });
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter") || "all";
    applyFilters();
  });

  applyFilters();
})();
