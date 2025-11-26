/*
  # Update Modern Bicho Items with Size Variations and Add-ons

  1. Category Update
    - Update category name to "Modern Bicho"
    - Description: Inspired by the Pinoy bicho-bicho we all grew up with.

  2. Menu Items (5 items)
    - Bicho Pack of 3 Classic (Classic/Sugar-Raised) - Price: 100
    - Bicho Pack of 3 Assorted - Price: 120
    - Bicho Pack of 3 Snowcheese - Price: 125
    - Bicho Pack of 3 Coffee Cream - Price: 125
    - Bicho Pack of 6 Assorted - Price: 230

  3. Features
    - Each item has two size variations: Standard and Gift
    - Standard price is the base_price, Gift price is base_price + variation price (adds 15)
    - Flavors are added as add-ons with price 0 (they're just flavor selections)
*/

-- Update category name and sort order
UPDATE categories 
SET name = 'Modern Bicho',
    sort_order = 5,
    active = true
WHERE id = 'bicho';

-- Ensure the category exists
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('bicho', 'Modern Bicho', '🥖', 5, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  active = EXCLUDED.active;

-- Update existing items or insert if they don't exist
-- Bicho Pack of 3 Classic
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Bicho Pack of 3 Classic', 'Pack of 3 Classic/Sugar-Raised', 100, 'bicho', false, true, NULL)
ON CONFLICT DO NOTHING;

-- Add size variations for Bicho Pack of 3 Classic
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Bicho Pack of 3 Classic'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Bicho Pack of 3 Classic'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Bicho Pack of 3 Classic
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Classic', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 3 Classic'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Classic');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Sugar-Raised', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 3 Classic'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Sugar-Raised');

-- Bicho Pack of 3 Assorted
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Bicho Pack of 3 Assorted', '1 pc per variant: Sugar-Raised, Snowcheese, Coffee Cream', 120, 'bicho', true, true, NULL)
ON CONFLICT DO NOTHING;

-- Add size variations for Bicho Pack of 3 Assorted
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Bicho Pack of 3 Assorted'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Bicho Pack of 3 Assorted'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Bicho Pack of 3 Assorted
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Sugar-Raised', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 3 Assorted'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Sugar-Raised');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Snowcheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 3 Assorted'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Snowcheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Coffee Cream', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 3 Assorted'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Coffee Cream');

-- Bicho Pack of 3 Snowcheese
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Bicho Pack of 3 Snowcheese', 'Snowcheese Bicho Pack of 3', 125, 'bicho', false, true, NULL)
ON CONFLICT DO NOTHING;

-- Add size variations for Bicho Pack of 3 Snowcheese
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Bicho Pack of 3 Snowcheese'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Bicho Pack of 3 Snowcheese'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Bicho Pack of 3 Snowcheese
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Snowcheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 3 Snowcheese'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Snowcheese');

-- Bicho Pack of 3 Coffee Cream
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Bicho Pack of 3 Coffee Cream', 'Coffee Cream Bicho Pack of 3', 125, 'bicho', false, true, NULL)
ON CONFLICT DO NOTHING;

-- Add size variations for Bicho Pack of 3 Coffee Cream
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Bicho Pack of 3 Coffee Cream'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Bicho Pack of 3 Coffee Cream'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Bicho Pack of 3 Coffee Cream
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Coffee Cream', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 3 Coffee Cream'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Coffee Cream');

-- Bicho Pack of 6 Assorted
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Bicho Pack of 6 Assorted', '2 pcs per variant: Sugar-Raised, Snowcheese, Coffee Cream', 230, 'bicho', true, true, NULL)
ON CONFLICT DO NOTHING;

-- Add size variations for Bicho Pack of 6 Assorted
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Bicho Pack of 6 Assorted'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Bicho Pack of 6 Assorted'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Bicho Pack of 6 Assorted
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Sugar-Raised', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 6 Assorted'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Sugar-Raised');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Snowcheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 6 Assorted'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Snowcheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Coffee Cream', 0, 'Flavor'
FROM menu_items
WHERE name = 'Bicho Pack of 6 Assorted'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Coffee Cream');

