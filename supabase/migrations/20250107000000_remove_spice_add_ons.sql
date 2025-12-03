/*
  # Remove Spice Level Add-ons

  1. Deletes all add-ons with category 'spice'
  2. This removes the Spice Level category from all menu items
*/

-- Delete all add-ons with category 'spice'
DELETE FROM add_ons
WHERE category = 'spice';

