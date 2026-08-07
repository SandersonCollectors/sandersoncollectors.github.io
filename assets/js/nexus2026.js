(function () {
  const root = document.getElementById("nexusDirectory");
  if (!root) return;

  const searchInput = document.getElementById("nexusSearch");
  const filters = document.getElementById("nexusFilters");
  const stats = document.getElementById("nexusStats");
  const noResults = document.getElementById("nexusNoResults");
  const cards = Array.from(root.querySelectorAll(".nexus-card"));
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
