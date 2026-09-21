(function () {
  const box = document.getElementById("search-box");
  const authorSelect = document.getElementById("search-author");
  const themeSelect = document.getElementById("search-theme");
  const fromInput = document.getElementById("search-from");
  const toInput = document.getElementById("search-to");
  const resultsEl = document.getElementById("search-results");
  const countEl = document.getElementById("search-count");
  if (!box || !resultsEl) return;

  let essays = [];

  function populateSelect(select, values, label) {
    const unique = Array.from(new Set(values.filter(Boolean))).sort();
    select.innerHTML = `<option value="">${label}</option>` +
      unique.map((v) => `<option value="${v.replace(/"/g, "&quot;")}">${v}</option>`).join("");
  }

  function render(list) {
    if (list.length === 0) {
      resultsEl.innerHTML = '<p class="empty">No essays match.</p>';
    } else {
      resultsEl.innerHTML = '<ul class="index">' + list.map((e) => `
        <li>
          <h3><a href="${e.url}">${e.title}</a></h3>
          <p class="byline">${e.author}${e.theme ? " · " + e.theme : ""}</p>
          <p class="dek">${e.summary}</p>
        </li>`).join("") + "</ul>";
    }
    countEl.textContent = list.length + (list.length === 1 ? " result" : " results");
  }

  function applyFilters() {
    const q = box.value.trim().toLowerCase();
    const author = authorSelect.value;
    const theme = themeSelect.value;
    const from = fromInput.value;
    const to = toInput.value;

    const filtered = essays.filter((e) => {
      if (q) {
        const hay = (e.title + " " + e.author + " " + e.theme + " " + e.summary).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (author && e.author !== author) return false;
      if (theme && e.theme !== theme) return false;
      if (from && e.date < from) return false;
      if (to && e.date > to) return false;
      return true;
    });

    render(filtered);
  }

  fetch("essays-index.json")
    .then((r) => r.json())
    .then((data) => {
      essays = data.sort((a, b) => (a.date < b.date ? 1 : -1));
      populateSelect(authorSelect, essays.map((e) => e.author), "All authors");
      populateSelect(themeSelect, essays.map((e) => e.theme), "All themes");
      render(essays);
    })
    .catch(() => {
      resultsEl.innerHTML = '<p class="empty">Search is unavailable right now.</p>';
    });

  [box, authorSelect, themeSelect, fromInput, toInput].forEach((el) => {
    el.addEventListener("input", applyFilters);
  });
})();
