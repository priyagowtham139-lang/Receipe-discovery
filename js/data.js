/* =====================================================================
   data.js – RECIPE DETAILS (shown in the "View Recipe" pop-up)
   ---------------------------------------------------------------------
   The cards (name, image, category, time) are written in the HTML files.
   This file only holds what the pop-up needs: description, ingredients, steps.

   HOW TO ADD A NEW RECIPE
   1. Copy any <article class="card"> block in explore.html (and index.html if popular).
   2. Give it a NEW data-id (13, 14, ...). Change image, name, category, time.
   3. Copy one block below, use the SAME id, and write its description,
      ingredients and steps.
   ===================================================================== */
const recipeDetails = [

  // ===== 1. Fluffy Pancakes =====
  {
    id: 1,
    description: "Golden, cloud-soft pancakes with maple syrup and berries.",
    ingredients: [
      "1½ cups flour",
      "2 tbsp sugar",
      "1 tbsp baking powder",
      "1 cup milk",
      "1 egg",
      "3 tbsp melted butter",
    ],
    steps: [
      "Whisk the dry ingredients in a large bowl.",
      "Mix milk, egg and butter, then pour into the dry mix.",
      "Stir gently until just combined; lumps are fine.",
      "Cook ¼ cup batter per pancake on a buttered pan until bubbles form, flip and cook 1 more minute.",
      "Serve warm with syrup and berries.",
    ]
  },

  // ===== 2. Avocado Toast =====
  {
    id: 2,
    description: "Crunchy sourdough topped with creamy smashed avocado.",
    ingredients: [
      "2 slices sourdough",
      "1 ripe avocado",
      "1 tsp lemon juice",
      "Chilli flakes",
      "Salt and pepper",
      "1 poached egg (optional)",
    ],
    steps: [
      "Toast the bread until crisp.",
      "Mash avocado with lemon juice, salt and pepper.",
      "Spread generously on the toast.",
      "Top with chilli flakes and a poached egg.",
    ]
  },

  // ===== 3. Masala Dosa =====
  {
    id: 3,
    description: "Crisp South Indian crepe filled with spiced potato masala.",
    ingredients: [
      "2 cups dosa batter",
      "3 boiled potatoes",
      "1 onion, sliced",
      "1 tsp mustard seeds",
      "½ tsp turmeric",
      "Curry leaves and oil",
    ],
    steps: [
      "Temper mustard seeds and curry leaves in oil.",
      "Add onion, turmeric and mashed potato; cook 5 minutes for the masala.",
      "Spread a ladle of batter thinly on a hot tawa.",
      "Drizzle oil, cook until golden and crisp.",
      "Add masala, fold and serve with chutney and sambar.",
    ]
  },

  // ===== 4. Veggie Buddha Bowl =====
  {
    id: 4,
    description: "A colourful bowl of quinoa, roasted veggies and tahini dressing.",
    ingredients: [
      "1 cup cooked quinoa",
      "1 cup chickpeas",
      "1 sweet potato, cubed",
      "Handful of spinach",
      "2 tbsp tahini",
      "1 lemon",
    ],
    steps: [
      "Roast sweet potato and chickpeas at 200°C for 20 minutes.",
      "Whisk tahini with lemon juice and water.",
      "Arrange quinoa, spinach and roasted veggies in a bowl.",
      "Drizzle with dressing and serve.",
    ]
  },

  // ===== 5. Chicken Caesar Wrap =====
  {
    id: 5,
    description: "Grilled chicken, crisp romaine and parmesan in a soft tortilla.",
    ingredients: [
      "2 grilled chicken breasts",
      "2 large tortillas",
      "1 cup romaine lettuce",
      "3 tbsp Caesar dressing",
      "¼ cup parmesan",
      "Black pepper",
    ],
    steps: [
      "Slice the grilled chicken.",
      "Toss lettuce with dressing and parmesan.",
      "Layer chicken and lettuce on tortillas.",
      "Roll tightly, slice in half and serve.",
    ]
  },

  // ===== 6. Paneer Butter Masala =====
  {
    id: 6,
    description: "Soft paneer cubes in a rich, creamy tomato gravy.",
    ingredients: [
      "250 g paneer, cubed",
      "4 tomatoes, pureed",
      "2 tbsp butter",
      "½ cup cream",
      "1 tsp garam masala",
      "1 tsp kasuri methi",
    ],
    steps: [
      "Melt butter and cook tomato puree with spices for 10 minutes.",
      "Blend the gravy until smooth and return to the pan.",
      "Add cream and paneer; simmer 5 minutes.",
      "Finish with kasuri methi and serve with naan or rice.",
    ]
  },

  // ===== 7. Spaghetti Carbonara =====
  {
    id: 7,
    description: "Classic Roman pasta with eggs, pecorino and crispy bacon.",
    ingredients: [
      "200 g spaghetti",
      "100 g bacon or guanciale",
      "2 eggs + 1 yolk",
      "½ cup grated pecorino",
      "Black pepper",
      "Salt for pasta water",
    ],
    steps: [
      "Boil spaghetti in salted water until al dente; save a cup of pasta water.",
      "Fry bacon until crisp.",
      "Whisk eggs, cheese and pepper together.",
      "Toss hot pasta with bacon, then off the heat stir in the egg mix with a splash of pasta water.",
      "Serve immediately with extra cheese.",
    ]
  },

  // ===== 8. Grilled Lemon Salmon =====
  {
    id: 8,
    description: "Flaky salmon fillets with garlic, lemon and fresh herbs.",
    ingredients: [
      "2 salmon fillets",
      "2 tbsp olive oil",
      "2 garlic cloves, minced",
      "1 lemon",
      "Fresh dill",
      "Salt and pepper",
    ],
    steps: [
      "Marinate salmon in oil, garlic, lemon juice and seasoning for 10 minutes.",
      "Heat a grill pan until hot.",
      "Cook salmon 4 minutes per side.",
      "Garnish with dill and lemon slices.",
    ]
  },

  // ===== 9. Chicken Biryani =====
  {
    id: 9,
    description: "Fragrant layered rice with marinated chicken and saffron.",
    ingredients: [
      "500 g chicken",
      "2 cups basmati rice",
      "1 cup yoghurt",
      "2 onions, fried",
      "Biryani masala",
      "Saffron milk and mint",
    ],
    steps: [
      "Marinate chicken in yoghurt and masala for 30 minutes.",
      "Parboil rice with whole spices to 70% done.",
      "Layer chicken, fried onion, mint and rice in a heavy pot.",
      "Drizzle saffron milk, seal and cook on low heat for 25 minutes.",
      "Rest 5 minutes, then fluff and serve.",
    ]
  },

  // ===== 10. Chocolate Lava Cake =====
  {
    id: 10,
    description: "Warm chocolate cake with a molten centre.",
    ingredients: [
      "100 g dark chocolate",
      "100 g butter",
      "2 eggs + 2 yolks",
      "¼ cup sugar",
      "2 tbsp flour",
      "Cocoa for dusting",
    ],
    steps: [
      "Melt chocolate and butter together; cool slightly.",
      "Whisk eggs, yolks and sugar until thick, then fold in chocolate and flour.",
      "Pour into greased ramekins dusted with cocoa.",
      "Bake at 220°C for 10–12 minutes until edges set.",
      "Invert onto plates and serve at once.",
    ]
  },

  // ===== 11. Mango Kulfi =====
  {
    id: 11,
    description: "Creamy no-churn Indian ice cream (plus 6 hours freezing).",
    ingredients: [
      "2 ripe mangoes, pureed",
      "1 cup condensed milk",
      "1 cup heavy cream",
      "¼ tsp cardamom",
      "Chopped pistachios",
    ],
    steps: [
      "Whip cream to soft peaks.",
      "Fold in condensed milk, mango puree and cardamom.",
      "Pour into moulds and sprinkle pistachios.",
      "Freeze for at least 6 hours.",
    ]
  },

  // ===== 12. Strawberry Cheesecake =====
  {
    id: 12,
    description: "Silky baked cheesecake on a buttery biscuit base.",
    ingredients: [
      "200 g digestive biscuits",
      "100 g melted butter",
      "500 g cream cheese",
      "¾ cup sugar",
      "3 eggs",
      "Fresh strawberries",
    ],
    steps: [
      "Crush biscuits, mix with butter and press into a tin.",
      "Beat cream cheese and sugar, then add eggs one at a time.",
      "Pour over the base and bake at 160°C for 35 minutes.",
      "Cool, chill for 4 hours and top with strawberries.",
    ]
  },
];

// The four categories (used by the filter buttons on the Explore page)
const categories = ["Breakfast", "Lunch", "Dinner", "Desserts"];
