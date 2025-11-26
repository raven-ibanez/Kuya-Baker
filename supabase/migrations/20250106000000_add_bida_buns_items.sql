/*
  # Add Kuya Baker's Bida Buns Menu Items

  1. New Category
    - Category: Kuya Baker's Bida Buns
    - Description: The Filipino tinapay lineup—each one a bida in their own way. All items are Pack of 4.

  2. New Menu Items (7 items)
    - Cinnamon Roll Pack - Standard: 120, Gift: 140
    - Lahat Bida: 4 in One Pack - Standard: 160, Gift: 180
    - Pan de Coco Pack - Standard: 150, Gift: 170
    - Pan de Ube Queso Pack - Standard: 190, Gift: 210
    - Jamon Queso Pack - Standard: 190, Gift: 210
    - Brown Coffee Bun Pack of 4 - Standard: 160, Gift: 180
    - Pan de Red Pack - Standard: 100, Gift: 120

  3. Features
    - Each item has two size variations: Standard and Gift
    - Standard price is the base_price, Gift price is base_price + variation price (adds 20)
    - Flavors are added as add-ons with price 0 (they're just flavor selections)
*/

-- Add category for Kuya Baker's Bida Buns
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('bida-buns', 'Kuya Baker''s Bida Buns', '🥯', 10, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  active = EXCLUDED.active;

-- Insert Cinnamon Roll Pack
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Cinnamon Roll Pack', 'Warm, soft, and swirled with cinnamon comfort. Pack of 4.', 120, 'bida-buns', true, true, NULL);

-- Add size variations for Cinnamon Roll Pack
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Cinnamon Roll Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Cinnamon Roll Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Insert Lahat Bida: 4 in One Pack
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Lahat Bida: 4 in One Pack', '1 pc each of Pan de Ube Queso, Pan de Coco, Pan de Jamon Queso, Brown Coffee Bun. Pack of 4.', 160, 'bida-buns', true, true, NULL);

-- Add size variations for Lahat Bida: 4 in One Pack
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Lahat Bida: 4 in One Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Lahat Bida: 4 in One Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Add flavor add-ons for Lahat Bida: 4 in One Pack
INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Pan de Ube Queso', 0, 'Flavor'
FROM menu_items
WHERE name = 'Lahat Bida: 4 in One Pack'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Pan de Ube Queso');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Pan de Coco', 0, 'Flavor'
FROM menu_items
WHERE name = 'Lahat Bida: 4 in One Pack'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Pan de Coco');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Pan de Jamon Queso', 0, 'Flavor'
FROM menu_items
WHERE name = 'Lahat Bida: 4 in One Pack'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Pan de Jamon Queso');

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Brown Coffee Bun', 0, 'Flavor'
FROM menu_items
WHERE name = 'Lahat Bida: 4 in One Pack'
  AND NOT EXISTS (SELECT 1 FROM add_ons WHERE menu_item_id = menu_items.id AND name = 'Brown Coffee Bun');

-- Insert Pan de Coco Pack
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Pan de Coco Pack', 'Soft dough filled with sweet coconut. Pack of 4.', 150, 'bida-buns', true, true, NULL);

-- Add size variations for Pan de Coco Pack
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Pan de Coco Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Pan de Coco Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Insert Pan de Ube Queso Pack
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Pan de Ube Queso Pack', 'Soft ube-flavored bread with filling made of purple yam/taro and melty cheese. Pack of 4.', 190, 'bida-buns', true, true, NULL);

-- Add size variations for Pan de Ube Queso Pack
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Pan de Ube Queso Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Pan de Ube Queso Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Insert Jamon Queso Pack
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Jamon Queso Pack', 'Soft bun filled with jamon and cheese, topped with more jamon and cheese. Pack of 4.', 190, 'bida-buns', true, true, NULL);

-- Add size variations for Jamon Queso Pack
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Jamon Queso Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Jamon Queso Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Insert Brown Coffee Bun Pack of 4
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Brown Coffee Bun Pack of 4', 'Brown coffee bun in a pack of 4', 160, 'bida-buns', true, true, NULL);

-- Add size variations for Brown Coffee Bun Pack of 4
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Brown Coffee Bun Pack of 4'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Brown Coffee Bun Pack of 4'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Insert Pan de Red Pack
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Pan de Red Pack', 'Comfortingly Pinoy red bread. Pack of 4.', 100, 'bida-buns', true, true, NULL);

-- Add size variations for Pan de Red Pack
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Pan de Red Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Pan de Red Pack'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');
