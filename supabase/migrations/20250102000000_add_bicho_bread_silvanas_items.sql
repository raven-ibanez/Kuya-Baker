/*
  # Add Bicho, Bread, and Silvanas Menu Items

  1. New Menu Items
    - Bicho category: Pack of 3 and Pack of 6 varieties
    - Bread category: Colorswirl, Chocoswirl, and Butter Garlic loaves
    - Silvanas category: Cashew and Biscoff varieties

  2. Features
    - Gift pricing for bread items (using discount_price)
    - Proper categorization
    - All descriptions within 100 character limit
*/

-- First, ensure we have appropriate categories (if they don't exist, they'll be ignored)
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('bicho', 'Bicho', '🥖', 5, true),
  ('bread', 'Bread', '🍞', 6, true),
  ('silvanas', 'Silvanas & Sans Rival', '🍰', 7, true)
ON CONFLICT (id) DO NOTHING;

-- Insert Bicho items (7. Modern Bicho)
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Bicho Pack of 3 Classic', 'Pack of 3 Classic/ Sugar-Raised', 100, 'bicho', false, true, NULL),
  ('Bicho Pack of 3 Assorted', '1 Pc. per variant: Sugar-Raised, Snowcheese, Coffee Cream', 120, 'bicho', true, true, NULL),
  ('Bicho Pack of 6 Assorted', '2 Pcs. per variant: Sugar-Raised, Snowcheese, Coffee Cream', 230, 'bicho', true, true, NULL),
  ('Bicho Pack of 3 Snowcheese', 'Snowcheese Bicho Pack of 3', 125, 'bicho', false, true, NULL),
  ('Bicho Pack of 3 Coffee Cream', 'Coffee Cream Bicho Pack of 3', 125, 'bicho', false, true, NULL);

-- Insert Bread items (5. Bread, But Make It Fun)
-- Note: Butter Garlic Loaf description truncated to 100 characters
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url, discount_price, discount_active) VALUES
  ('Colorswirl Loaf', 'Good vibes in a soft, colorful bread, brightens your day one slice at a time.', 175, 'bread', true, true, NULL, 195, true),
  ('Chocoswirl Loaf', 'Soft bread + chocolate swirls = your everyday comfort fix.', 190, 'bread', true, true, NULL, 210, true),
  ('Butter Garlic Loaf', 'Soft, savory, buttery, your new go-to for dips, pasta, soups and grilled sandwiches.', 200, 'bread', true, true, NULL, 220, true);

-- Insert Silvanas items (2. Frozen Cashew Crunch and Cream Favorites)
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  ('Cashew Silvanas', 'Frozen buttercream rounds on crisp meringue cookie, wrapped in cashew crumbs.', 195, 'silvanas', true, true, NULL),
  ('Biscoff Silvanas', 'Frozen Biscoff Cream and Cookie Rounds, wrapped in Biscoff crumbs.', 255, 'silvanas', true, true, NULL);

