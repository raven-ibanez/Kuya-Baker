/*
  # Add Kuya Baker Ensaymada Collection Menu Items

  1. New Category
    - Category: Kuya Baker Ensaymada Collection
    - Description: Comfort meets cool meets happy in every soft swirl.

  2. New Menu Items (8 items)
    - Classic Cheese Box of 3 - Standard: 135, Gift: 150
    - Assorted KB OG 3 (Classic Cheese, Snowcheese, Coffee Cream) - Standard: 150, Gift: 165
    - Assorted Fil-Asia 3 (Classic Cheese, Jamon Queso, Chicken Floss Nori) - Standard: 160, Gift: 175
    - Assorted Choose Your Flavors Box of 3 - Standard: 160, Gift: 175
    - Classic Cheese Box of 6 - Standard: 255, Gift: 270
    - Assorted KB OG 6 - Standard: 285, Gift: 300
    - Assorted Fil-Asia 6 - Standard: 300, Gift: 315
    - Assorted Choose Your Flavors Box of 6 - Standard: 300, Gift: 315

  3. Features
    - Each item has two size variations: Standard and Gift
    - Standard price is the base_price, Gift price is base_price + variation price
    - Flavors are added as add-ons with price 0 (they're just flavor selections)
*/

-- Add category for Kuya Baker Ensaymada Collection
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('ensaymada-collection', 'Kuya Baker Ensaymada Collection', '🧁', 9, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  active = EXCLUDED.active;

-- Insert Classic Cheese Box of 3
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Classic Cheese Box of 3', 'Classic cheese ensaymada in a box of 3', 135, 'ensaymada-collection', true, true, NULL);

-- Add size variations for Classic Cheese Box of 3
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Classic Cheese Box of 3'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Classic Cheese Box of 3'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Insert Assorted KB OG 3
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Assorted KB OG 3', 'Assorted ensaymada box of 3: Classic Cheese, Snowcheese, Coffee Cream', 150, 'ensaymada-collection', true, true, NULL);

-- Add size variations for Assorted KB OG 3
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Assorted KB OG 3'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Assorted KB OG 3'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Assorted KB OG 3
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Classic Cheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted KB OG 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Classic Cheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Snowcheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted KB OG 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Snowcheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Coffee Cream', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted KB OG 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Coffee Cream');

-- Insert Assorted Fil-Asia 3
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Assorted Fil-Asia 3', 'Assorted ensaymada box of 3: Classic Cheese, Jamon Queso, Chicken Floss Nori', 160, 'ensaymada-collection', true, true, NULL);

-- Add size variations for Assorted Fil-Asia 3
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Assorted Fil-Asia 3'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Assorted Fil-Asia 3'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Assorted Fil-Asia 3
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Classic Cheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Fil-Asia 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Classic Cheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Jamon Queso', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Fil-Asia 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Jamon Queso');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Chicken Floss Nori', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Fil-Asia 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Chicken Floss Nori');

-- Insert Assorted Choose Your Flavors Box of 3
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Assorted Choose Your Flavors Box of 3', 'Choose your favorite flavors for a box of 3 ensaymada', 160, 'ensaymada-collection', true, true, NULL);

-- Add size variations for Assorted Choose Your Flavors Box of 3
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 3'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 3'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add all flavor add-ons for Assorted Choose Your Flavors Box of 3
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Classic Cheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Classic Cheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Snowcheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Snowcheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Coffee Cream', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Coffee Cream');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Jamon Queso', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Jamon Queso');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Chicken Floss Nori', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 3'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Chicken Floss Nori');

-- Insert Classic Cheese Box of 6
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Classic Cheese Box of 6', 'Classic cheese ensaymada in a box of 6 (6 pcs Classic Cheese)', 255, 'ensaymada-collection', true, true, NULL);

-- Add size variations for Classic Cheese Box of 6
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Classic Cheese Box of 6'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Classic Cheese Box of 6'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Insert Assorted KB OG 6
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Assorted KB OG 6', 'Assorted ensaymada box of 6: 2 pcs each of Classic Cheese, Snowcheese, Coffee Cream', 285, 'ensaymada-collection', true, true, NULL);

-- Add size variations for Assorted KB OG 6
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Assorted KB OG 6'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Assorted KB OG 6'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Assorted KB OG 6
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Classic Cheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted KB OG 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Classic Cheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Snowcheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted KB OG 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Snowcheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Coffee Cream', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted KB OG 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Coffee Cream');

-- Insert Assorted Fil-Asia 6
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Assorted Fil-Asia 6', 'Assorted ensaymada box of 6: 2 pcs each of Classic Cheese, Jamon Queso, Chicken Floss Nori', 300, 'ensaymada-collection', true, true, NULL);

-- Add size variations for Assorted Fil-Asia 6
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Assorted Fil-Asia 6'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Assorted Fil-Asia 6'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Assorted Fil-Asia 6
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Classic Cheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Fil-Asia 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Classic Cheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Jamon Queso', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Fil-Asia 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Jamon Queso');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Chicken Floss Nori', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Fil-Asia 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Chicken Floss Nori');

-- Insert Assorted Choose Your Flavors Box of 6
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Assorted Choose Your Flavors Box of 6', 'Choose your favorite flavors for a box of 6 ensaymada: Classic Cheese, Jamon Queso, Chicken Floss Nori, Snowcheese, Coffee Cream', 300, 'ensaymada-collection', true, true, NULL);

-- Add size variations for Assorted Choose Your Flavors Box of 6
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 6'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 15
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 6'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add all flavor add-ons for Assorted Choose Your Flavors Box of 6
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Classic Cheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Classic Cheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Jamon Queso', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Jamon Queso');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Chicken Floss Nori', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Chicken Floss Nori');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Snowcheese', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Snowcheese');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Coffee Cream', 0, 'Flavor'
FROM menu_items
WHERE name = 'Assorted Choose Your Flavors Box of 6'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Coffee Cream');

