/* =====================================================================
   app.js – SHARED CODE used by every page
   ---------------------------------------------------------------------
   1. LocalStorage helpers   (meal plan + favourites are saved here)
   2. Small helpers          (toast message, navbar badge)
   3. readCard()             (reads name / category / time / image from HTML)
   4. Recipe pop-up          (ingredients, instructions, Add to Meal Plan)
   5. Click handling         (View Recipe, + Plan, heart button)
   6. Page effects           (scroll reveal, navbar, progress bar, tilt ...)
   ===================================================================== */

/* ---------- 1. LOCALSTORAGE ---------- */
const PLAN_KEY = "rd_mealPlan_v2";   // meal plan  -> list of recipe objects
const FAV_KEY  = "rd_favourites";    // favourites -> list of recipe ids

// Read a list from LocalStorage (returns [] if nothing saved yet)
function readStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch (err) { return []; }
}
// Save a list to LocalStorage
function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
const getPlan = () => readStorage(PLAN_KEY);
const getFavs = () => readStorage(FAV_KEY);
const inPlan  = id => getPlan().some(item => item.id === id);   // some() -> true/false
const isFav   = id => getFavs().includes(id);

/* ---------- 2. SMALL HELPERS ---------- */
// Little message that slides up from the bottom
function toast(message) {
  let box = document.querySelector(".toast");
  if (!box) {
    box = document.createElement("div");
    box.className = "toast";
    document.body.appendChild(box);
  }
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(box._timer);
  box._timer = setTimeout(() => box.classList.remove("show"), 2200);
}

// Red number in the navbar = how many recipes are in the meal plan
function updateBadge() {
  const badge = document.querySelector("#planBadge");
  if (!badge) return;
  badge.textContent = getPlan().length;
  badge.classList.remove("pop");
  void badge.offsetWidth;            // restart the little bounce animation
  badge.classList.add("pop");
}

// Add a recipe (an info object, see readCard) to the meal plan
function addToPlan(info) {
  if (inPlan(info.id)) { toast("Already in your meal plan"); return false; }
  writeStorage(PLAN_KEY, [...getPlan(), info]);
  updateBadge();
  toast("Added “" + info.name + "” to your meal plan");
  return true;
}

// Remove a recipe from the meal plan using filter()
function removeFromPlan(id) {
  writeStorage(PLAN_KEY, getPlan().filter(item => item.id !== id));
  updateBadge();
  toast("Removed from your meal plan");
}

// Turn the favourite heart on/off. Returns true when it is now a favourite.
function toggleFav(id) {
  const favs = getFavs();
  const already = favs.includes(id);
  writeStorage(FAV_KEY, already ? favs.filter(x => x !== id) : [...favs, id]);
  toast(already ? "Removed from favourites" : "Saved to favourites");
  return !already;
}

/* ---------- 3. READ A CARD FROM THE HTML ----------
   Any element with data-id="..." (card, hero, meal plan row) can be read.
   Name     -> <h3> text            Category -> .badge text
   Time     -> number before "min"  Image    -> src of the first <img>
   (A data-name / data-category / data-time / data-image attribute wins if present.) */
function readCard(el) {
  const d = el.dataset;
  const timeText = (el.querySelector(".meta") || { textContent: "" }).textContent;
  const match = timeText.match(/(\d+)\s*min/);
  return {
    id:       Number(d.id),
    name:     d.name     || el.querySelector("h3").textContent.trim(),
    category: d.category || el.querySelector(".badge").textContent.trim(),
    time:     Number(d.time) || (match ? Number(match[1]) : 0),
    image:    d.image    || el.querySelector("img").getAttribute("src")
  };
}

/* ---------- 4. RECIPE POP-UP ---------- */
function openModal(info) {
  // find() looks for the recipe with the same id in js/data.js
  const details = recipeDetails.find(r => r.id === info.id);
  if (!details) { toast("Details for this recipe are missing in data.js"); return; }

  let modal = document.querySelector(".modal");
  if (!modal) {                       // build the empty pop-up only once
    modal = document.createElement("div");
    modal.className = "modal";
    document.body.appendChild(modal);
    // clicking the dark background or the X closes it
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.closest("[data-close]")) closeModal();
    });
  }

  // map() turns each ingredient / step into an <li> line
  modal.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-label="${info.name}">
      <button class="modal-x" data-close aria-label="Close">✕</button>
      <img src="${info.image}" alt="${info.name}">
      <div class="modal-content">
        <span class="badge static">${info.category}</span>
        <h2>${info.name}</h2>
        <p class="meta">⏱ Preparation time: <strong>${info.time} minutes</strong></p>
        <p>${details.description}</p>
        <div class="two-col">
          <div><h4>Ingredients</h4>
            <ul class="ingredients">${details.ingredients.map(x => `<li>${x}</li>`).join("")}</ul></div>
          <div><h4>Instructions</h4>
            <ol class="steps">${details.steps.map(x => `<li>${x}</li>`).join("")}</ol></div>
        </div>
        <button class="btn btn-primary btn-lg" id="modalAdd">${inPlan(info.id) ? "✓ In Meal Plan" : "Add to Meal Plan"}</button>
      </div>
    </div>`;

  modal.querySelector("#modalAdd").addEventListener("click", e => {
    if (addToPlan(info)) {
      e.target.textContent = "✓ In Meal Plan";
      document.dispatchEvent(new Event("planchange"));   // tells the meal plan page to refresh
    }
  });
  requestAnimationFrame(() => modal.classList.add("open"));
  document.body.style.overflow = "hidden";               // stop page scrolling behind the pop-up
}
function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) { modal.classList.remove("open"); document.body.style.overflow = ""; }
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ---------- 5. CLICK HANDLING (one listener for all buttons) ----------
   Buttons use data-action="view" | "plan" | "fav".
   We find the card the button sits in (closest [data-id]) and read it. */
document.addEventListener("click", e => {
  const button = e.target.closest("[data-action]");
  if (button) {
    const host = button.closest("[data-id]");
    const info = readCard(host);
    const action = button.dataset.action;

    if (action === "view") openModal(info);
    if (action === "plan") { addToPlan(info); document.dispatchEvent(new Event("planchange")); }
    if (action === "fav")  {
      const nowFav = toggleFav(info.id);
      button.classList.toggle("on", nowFav);
      document.dispatchEvent(new Event("favchange"));
    }
  }

  // Ripple effect on every .btn
  const btn = e.target.closest(".btn");
  if (btn) {
    const dot = document.createElement("span");
    const box = btn.getBoundingClientRect();
    dot.className = "ripple";
    dot.style.left = e.clientX - box.left + "px";
    dot.style.top  = e.clientY - box.top + "px";
    btn.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  }
});

/* ---------- 6. PAGE EFFECTS ---------- */
// Scroll reveal: elements with class "reveal" fade up when they enter the screen
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("in"); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
function observeReveals() {
  document.querySelectorAll(".reveal:not(.in)").forEach(el => revealObserver.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  // --- Navbar: hamburger menu, shadow on scroll, highlight current page ---
  const toggle = document.querySelector(".nav-toggle");
  const links  = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
  window.addEventListener("scroll", () =>
    document.querySelector(".navbar").classList.toggle("scrolled", scrollY > 20));
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a =>
    a.classList.toggle("active", a.getAttribute("href") === page));

  // --- Show saved favourites (red hearts) and the meal plan number ---
  const favs = getFavs();
  document.querySelectorAll("[data-id] .fav").forEach(heart =>
    heart.classList.toggle("on", favs.includes(Number(heart.closest("[data-id]").dataset.id))));
  updateBadge();
  observeReveals();

  // --- Page curtain: wipes away on load, wipes in when you click a page link ---
  const curtain = document.createElement("div");
  curtain.className = "curtain";
  document.body.appendChild(curtain);
  document.querySelectorAll("a[href*='.html']").forEach(a => a.addEventListener("click", e => {
    if (e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => (location.href = a.href), 350);
  }));

  // --- Scroll progress bar ---
  const bar = document.createElement("div");
  bar.className = "progress";
  document.body.appendChild(bar);
  addEventListener("scroll", () => {
    bar.style.transform = `scaleX(${scrollY / (document.body.scrollHeight - innerHeight || 1)})`;
  });

  // --- Soft light that follows the mouse ---
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);
  addEventListener("pointermove", e => {
    glow.style.transform = `translate(${e.clientX - 200}px,${e.clientY - 200}px)`;
  });

  // --- Floating golden sparks ---
  const sparks = document.createElement("div");
  sparks.className = "sparks";
  sparks.innerHTML = Array.from({ length: 22 }, () =>
    `<i style="left:${Math.random() * 100}%;--s:${2 + Math.random() * 4}px;--t:${12 + Math.random() * 16}s;--dl:-${Math.random() * 20}s"></i>`
  ).join("");
  document.body.appendChild(sparks);
});
window.addEventListener("pageshow", () => document.body.classList.remove("leaving"));

// 3D tilt: cards lean toward the mouse
document.addEventListener("pointermove", e => {
  const card = e.target.closest && e.target.closest(".card");
  if (!card) return;
  const box = card.getBoundingClientRect();
  const x = (e.clientX - box.left) / box.width - 0.5;
  const y = (e.clientY - box.top) / box.height - 0.5;
  card.style.setProperty("--ry", x * 10 + "deg");
  card.style.setProperty("--rx", -y * 10 + "deg");
  card.style.setProperty("--mx", (x + 0.5) * 100 + "%");
  card.style.setProperty("--my", (y + 0.5) * 100 + "%");
});
document.addEventListener("pointerout", e => {
  const card = e.target.closest && e.target.closest(".card");
  if (card) { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); }
});
