/* =====================================================================
   explore.js – SEARCH, CATEGORY FILTER, SORT and FAVOURITES (explore.html)
   ---------------------------------------------------------------------
   The 12 cards are written in explore.html. Here we:
   1. read every card into an array            -> Array.from + map()
   2. filter the array by search / category    -> filter()
   3. sort the result by time or name          -> sort()
   4. show the matching cards, hide the others
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const grid    = document.querySelector("#recipeGrid");
  const search  = document.querySelector("#search");
  const sort    = document.querySelector("#sort");
  const favOnly = document.querySelector("#favOnly");
  const chips   = document.querySelector("#chips");
  const count   = document.querySelector("#count");
  const empty   = document.querySelector("#empty");

  // 1. One object per card: its info (name, category, time, image) + the HTML element
  const cards = Array.from(grid.querySelectorAll(".card")).map(el => ({ ...readCard(el), el }));

  // Which category is selected? (Home page category links use explore.html?cat=Lunch)
  let category = new URLSearchParams(location.search).get("cat") || "All";
  if (category !== "All" && !categories.includes(category)) category = "All";

  function render() {
    const text = search.value.trim().toLowerCase();

    // 2. FILTER: category + name search (+ favourites)
    let result = cards.filter(c =>
      (category === "All" || c.category === category) &&
      c.name.toLowerCase().includes(text) &&
      (!favOnly.checked || isFav(c.id))
    );

    // 3. SORT (copy first so the original order is kept)
    if (sort.value === "fast") result = [...result].sort((a, b) => a.time - b.time);
    if (sort.value === "slow") result = [...result].sort((a, b) => b.time - a.time);
    if (sort.value === "az")   result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    // 4. SHOW / HIDE. Hide all, then show the matches in the sorted order.
    cards.forEach(c => (c.el.hidden = true));
    result.forEach((c, i) => {
      c.el.hidden = false;
      grid.appendChild(c.el);                       // moving the element = re-ordering
      c.el.classList.add("in");
      c.el.classList.remove("pop-in");
      void c.el.offsetWidth;                        // restart animation
      c.el.style.setProperty("--d", (i % 6) * 60 + "ms");
      c.el.classList.add("pop-in");
    });

    count.textContent = result.length + (result.length === 1 ? " recipe found" : " recipes found");
    empty.hidden = result.length > 0;
    chips.querySelectorAll(".chip").forEach(chip =>
      chip.classList.toggle("active", chip.dataset.cat === category));
  }

  // Events: re-run render() whenever the person changes something
  search.addEventListener("input", render);
  sort.addEventListener("change", render);
  favOnly.addEventListener("change", render);
  chips.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (chip) { category = chip.dataset.cat; render(); }
  });
  document.querySelector("#reset").addEventListener("click", () => {
    search.value = ""; sort.value = ""; favOnly.checked = false; category = "All"; render();
  });
  document.addEventListener("favchange", () => { if (favOnly.checked) render(); });

  render();
});
