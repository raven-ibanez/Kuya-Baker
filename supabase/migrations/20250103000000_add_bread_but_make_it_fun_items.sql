/*
  # Add BREAD, BUT MAKE IT FUN Menu Items

  1. New Category
    - Category: BREAD, BUT MAKE IT FUN
    - Description: Loaves with personality, made for sharing moments. Add-on Option: Gift packaging includes Box, Ribbon, and Card.

  2. New Menu Items
    - Colorswirl Loaf (1 Loaf, 8.5" Length) - Standard: 175, Gift: 195
    - Chocoswirl Loaf (1 Loaf, 8.5" Length) - Standard: 190, Gift: 210
    - Butter Garlic Loaf (1 Loaf, 8.5" Length) - Standard: 200, Gift: 220

  3. Features
    - Each item has two size variations: Standard and Gift
    - Standard price is the base_price, Gift price is base_price + variation price
*/

-- Add category for BREAD, BUT MAKE IT FUN
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('bread-fun', 'BREAD, BUT MAKE IT FUN', '🍞', 8, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  active = EXCLUDED.active;

-- Insert Colorswirl Loaf
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Colorswirl Loaf (1 Loaf, 8.5" Length)', 'Good vibes in a soft, colorful bread, brightens your day one slice at a time.', 175, 'bread-fun', true, true, NULL);

-- Add size variations for Colorswirl Loaf
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Colorswirl Loaf (1 Loaf, 8.5" Length)'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Colorswirl Loaf (1 Loaf, 8.5" Length)'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Insert Chocoswirl Loaf
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Chocoswirl Loaf (1 Loaf, 8.5" Length)', 'Soft bread + chocolate swirls = your everyday comfort fix.', 190, 'bread-fun', true, true, NULL);

-- Add size variations for Chocoswirl Loaf
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Chocoswirl Loaf (1 Loaf, 8.5" Length)'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Chocoswirl Loaf (1 Loaf, 8.5" Length)'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

-- Insert Butter Garlic Loaf
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Butter Garlic Loaf (1 Loaf, 8.5" Length)', 'Soft, savory, buttery, your new go-to for dips, pasta, soups and that grilled sandwich craving.', 200, 'bread-fun', true, true, NULL);

-- Add size variations for Butter Garlic Loaf
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Standard', 0
FROM menu_items
WHERE name = 'Butter Garlic Loaf (1 Loaf, 8.5" Length)'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Standard');

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Gift', 20
FROM menu_items
WHERE name = 'Butter Garlic Loaf (1 Loaf, 8.5" Length)'
  AND NOT EXISTS (SELECT 1 FROM variations WHERE menu_item_id = menu_items.id AND name = 'Gift');

