/* =====================================================================
   mealplan.js – MY MEAL PLAN page (meal-plan.html)
   ---------------------------------------------------------------------
   The plan is saved in LocalStorage (see app.js). Each saved item already
   contains the recipe's id, name, category, time and IMAGE path, so the
   image you put in the HTML card is the one shown here.
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const list    = document.querySelector("#planList");
  const empty   = document.querySelector("#planEmpty");
  const summary = document.querySelector("#summary");
  const clearBtn = document.querySelector("#clearAll");

  function render() {
    const plan = getPlan();

    // map() -> one <li> row for every saved recipe
    list.innerHTML = plan.map((item, i) => `
      <li class="plan-item" style="--d:${i * 60}ms"
          data-id="${item.id}" data-name="${item.name}" data-category="${item.category}"
          data-time="${item.time}" data-image="${item.image}">
        <img src="${item.image}" alt="${item.name}">
        <div class="plan-info">
          <h3>${item.name}</h3>
          <p class="meta">${item.category} · ⏱ ${item.time} min</p>
        </div>
        <button class="btn btn-ghost" data-action="view">View</button>
        <button class="btn btn-danger" data-remove="${item.id}">Remove</button>
      </li>`).join("");

    // reduce() -> add up all cooking times
    const totalMinutes = plan.reduce((sum, item) => sum + item.time, 0);
    summary.innerHTML = plan.length
      ? `<div><strong>${plan.length}</strong><span>recipes</span></div>
         <div><strong>${totalMinutes}</strong><span>total minutes</span></div>`
      : "";

    empty.hidden = plan.length > 0;      // show the empty message when nothing is saved
    clearBtn.hidden = plan.length === 0;
  }

  // Remove button: slide the row away, then delete it from LocalStorage
  list.addEventListener("click", e => {
    const button = e.target.closest("[data-remove]");
    if (!button) return;
    button.closest(".plan-item").classList.add("out");
    setTimeout(() => { removeFromPlan(Number(button.dataset.remove)); render(); }, 380);
  });

  // Clear everything
  clearBtn.addEventListener("click", () => {
    if (confirm("Remove all recipes from your meal plan?")) {
      writeStorage(PLAN_KEY, []);
      updateBadge();
      render();
    }
  });

  // When a recipe is added from the pop-up, refresh the list
  document.addEventListener("planchange", render);
  render();
});
