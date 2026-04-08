# Companion Planting Data Reference

This document lists every plant in the database along with its companion friends and foes.

## How Companion Checking Works

When a plant is placed on the grid, the app checks all **8 adjacent cells** (up, down, left, right, and all 4 diagonals). For each neighbor that has a plant:

- If the neighbor appears in the plant's **friends** list, it's marked as a **friend** (good companion).
- If the neighbor appears in the plant's **foes** list, it's marked as a **foe** (bad companion).
- If the neighbor isn't in either list, it's considered **neutral** (no known relationship).

The cell background color reflects the combined result:

| Color | Meaning |
|-------|---------|
| Spring green `#86efac` | All nearby companions are friends |
| Rose `#fda4af` | One or more nearby companions are foes (no friends) |
| Gold `#c2a75a` | Mix of friends and foes nearby |
| Cream `#d6d3c7` | Planted, but no companion relationships with neighbors |

---

## Vegetables

### Tomato
- **Friends:** Basil, Carrot, Celery, Chives, Parsley, Marigold, Nasturtium, Pepper, Asparagus, Borage, Garlic, Onion, Mint, Lettuce, Spinach
- **Foes:** Cabbage, Broccoli, Cauliflower, Kale, Corn, Potato, Dill, Beet, Rosemary

### Pepper
- **Friends:** Tomato, Basil, Carrot, Onion, Parsley, Spinach, Marigold, Oregano
- **Foes:** Beans, Kale, Cabbage, Broccoli, Cauliflower

### Cucumber
- **Friends:** Beans, Corn, Peas, Radish, Sunflower, Lettuce, Dill, Marigold, Nasturtium, Borage, Celery, Spinach
- **Foes:** Potato, Sage, Melon, Watermelon

### Squash
- **Friends:** Corn, Beans, Nasturtium, Marigold, Radish, Borage, Peas, Sunflower
- **Foes:** Potato, Pumpkin

### Zucchini
- **Friends:** Corn, Beans, Nasturtium, Marigold, Radish, Borage, Peas
- **Foes:** Potato, Pumpkin

### Corn
- **Friends:** Beans, Squash, Zucchini, Pumpkin, Cucumber, Peas, Melon, Watermelon, Sunflower
- **Foes:** Tomato, Celery

### Beans
- **Friends:** Corn, Squash, Zucchini, Pumpkin, Cucumber, Carrot, Celery, Eggplant, Peas, Radish, Strawberry, Marigold, Borage, Lettuce, Spinach, Beet
- **Foes:** Onion, Garlic, Chives, Leek, Pepper, Sunflower

### Peas
- **Friends:** Carrot, Corn, Cucumber, Beans, Radish, Turnip, Spinach, Lettuce, Mint
- **Foes:** Onion, Garlic, Chives, Leek

### Carrot
- **Friends:** Tomato, Pepper, Beans, Peas, Lettuce, Onion, Leek, Chives, Rosemary, Sage, Radish
- **Foes:** Dill, Celery

### Radish
- **Friends:** Carrot, Cucumber, Lettuce, Peas, Beans, Squash, Zucchini, Spinach, Nasturtium, Chives
- **Foes:** Cabbage, Broccoli, Cauliflower, Turnip

### Beet
- **Friends:** Lettuce, Onion, Garlic, Cabbage, Broccoli, Cauliflower, Beans, Mint
- **Foes:** Tomato

### Onion
- **Friends:** Carrot, Beet, Lettuce, Tomato, Pepper, Strawberry, Cabbage, Broccoli, Cauliflower
- **Foes:** Beans, Peas, Asparagus

### Garlic
- **Friends:** Tomato, Beet, Lettuce, Strawberry, Cabbage, Broccoli, Cauliflower, Pepper, Carrot, Spinach
- **Foes:** Beans, Peas, Asparagus

### Lettuce
- **Friends:** Carrot, Radish, Onion, Garlic, Beet, Strawberry, Chives, Beans, Peas, Cucumber, Tomato, Marigold, Mint, Spinach
- **Foes:** Celery

### Spinach
- **Friends:** Strawberry, Beans, Peas, Lettuce, Radish, Tomato, Pepper, Garlic, Cucumber, Celery, Onion
- **Foes:** None

### Kale
- **Friends:** Beet, Celery, Cucumber, Dill, Garlic, Lettuce, Onion, Spinach, Thyme
- **Foes:** Tomato, Pepper, Strawberry

### Cabbage
- **Friends:** Onion, Garlic, Beet, Celery, Dill, Thyme, Sage, Rosemary, Mint, Nasturtium, Marigold
- **Foes:** Tomato, Pepper, Strawberry, Radish

### Broccoli
- **Friends:** Onion, Garlic, Beet, Celery, Dill, Thyme, Sage, Rosemary, Mint, Nasturtium, Marigold
- **Foes:** Tomato, Pepper, Strawberry, Radish

### Cauliflower
- **Friends:** Onion, Garlic, Beet, Celery, Dill, Thyme, Sage, Rosemary, Mint, Nasturtium, Marigold
- **Foes:** Tomato, Pepper, Strawberry, Radish

### Celery
- **Friends:** Tomato, Beans, Cabbage, Broccoli, Cauliflower, Spinach, Kale, Leek, Onion, Garlic
- **Foes:** Corn, Carrot, Lettuce, Potato

### Potato
- **Friends:** Beans, Corn, Cabbage, Marigold, Peas, Basil, Thyme
- **Foes:** Tomato, Cucumber, Squash, Zucchini, Pumpkin, Sunflower, Celery, Eggplant

### Sweet Potato
- **Friends:** Beans, Thyme, Oregano, Marigold, Dill
- **Foes:** Squash, Pumpkin, Tomato

### Eggplant
- **Friends:** Beans, Pepper, Spinach, Thyme, Marigold, Nasturtium, Basil
- **Foes:** Potato

### Turnip
- **Friends:** Peas, Onion, Garlic, Mint, Thyme
- **Foes:** Radish, Potato

### Okra
- **Friends:** Pepper, Eggplant, Basil, Marigold, Sunflower, Lettuce, Cucumber
- **Foes:** None

### Asparagus
- **Friends:** Tomato, Parsley, Basil, Marigold, Nasturtium, Dill
- **Foes:** Onion, Garlic

### Leek
- **Friends:** Carrot, Celery, Onion
- **Foes:** Beans, Peas

### Pumpkin
- **Friends:** Corn, Beans, Marigold, Nasturtium, Sunflower, Oregano
- **Foes:** Potato, Squash, Zucchini, Sweet Potato

### Melon
- **Friends:** Corn, Sunflower, Marigold, Nasturtium, Lettuce, Radish
- **Foes:** Cucumber, Watermelon

### Watermelon
- **Friends:** Corn, Sunflower, Marigold, Nasturtium, Lettuce, Radish
- **Foes:** Cucumber, Melon

---

## Herbs

### Basil
- **Friends:** Tomato, Pepper, Asparagus, Eggplant, Okra, Potato, Marigold, Oregano
- **Foes:** Sage, Thyme, Rosemary

### Cilantro
- **Friends:** Tomato, Pepper, Spinach, Lettuce, Peas, Beans, Dill
- **Foes:** None

### Dill
- **Friends:** Cucumber, Cabbage, Broccoli, Cauliflower, Kale, Lettuce, Onion, Corn, Asparagus, Cilantro, Sweet Potato
- **Foes:** Tomato, Carrot, Lavender

### Parsley
- **Friends:** Tomato, Pepper, Asparagus, Carrot, Corn, Chives, Peas, Beans
- **Foes:** Lettuce, Mint

### Rosemary
- **Friends:** Cabbage, Broccoli, Cauliflower, Carrot, Beans, Sage, Thyme, Lavender
- **Foes:** Tomato, Basil, Cucumber

### Thyme
- **Friends:** Cabbage, Broccoli, Cauliflower, Kale, Potato, Eggplant, Strawberry, Rosemary, Sage, Lavender, Turnip, Sweet Potato
- **Foes:** Basil

### Oregano
- **Friends:** Pepper, Tomato, Basil, Pumpkin, Sweet Potato
- **Foes:** None

### Mint
- **Friends:** Tomato, Cabbage, Broccoli, Cauliflower, Peas, Lettuce, Beet, Turnip
- **Foes:** Parsley, Lavender

### Sage
- **Friends:** Cabbage, Broccoli, Cauliflower, Carrot, Rosemary, Thyme, Lavender, Strawberry
- **Foes:** Basil, Cucumber

### Chives
- **Friends:** Tomato, Carrot, Lettuce, Radish, Parsley, Strawberry
- **Foes:** Beans, Peas

### Lavender
- **Friends:** Rosemary, Thyme, Sage, Oregano
- **Foes:** Dill, Mint

---

## Flowers

### Marigold
- **Friends:** Tomato, Pepper, Cucumber, Squash, Zucchini, Beans, Lettuce, Potato, Eggplant, Cabbage, Broccoli, Cauliflower, Basil, Melon, Watermelon, Pumpkin, Okra, Asparagus, Sweet Potato
- **Foes:** None

### Nasturtium
- **Friends:** Tomato, Cucumber, Squash, Zucchini, Pumpkin, Cabbage, Broccoli, Cauliflower, Radish, Beans, Eggplant, Melon, Watermelon, Asparagus
- **Foes:** None

### Sunflower
- **Friends:** Cucumber, Corn, Squash, Pumpkin, Melon, Watermelon, Okra
- **Foes:** Beans, Potato

### Borage
- **Friends:** Tomato, Cucumber, Squash, Zucchini, Beans, Strawberry
- **Foes:** None

---

## Fruit

### Strawberry
- **Friends:** Beans, Lettuce, Onion, Garlic, Spinach, Thyme, Sage, Chives, Borage, Marigold
- **Foes:** Cabbage, Broccoli, Cauliflower, Kale

### Cantaloupe
- **Friends:** Corn, Sunflower, Marigold, Nasturtium, Lettuce, Radish
- **Foes:** Cucumber, Watermelon

---

## Adding Custom Plants

You can add your own plants using the "+ Add Plant" form in the palette. Enter:

- **Name** — The display name for your plant
- **Emoji** — Any emoji to represent it (defaults to a seedling)
- **Friends** — Comma-separated list of plant names that are good companions
- **Foes** — Comma-separated list of plant names that are bad companions

Custom plants appear in the "Custom" category filter. Friend and foe names are matched by converting them to lowercase with spaces replaced by underscores (e.g., "Sweet Potato" becomes `sweet_potato`).
