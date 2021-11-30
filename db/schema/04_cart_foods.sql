-- Drop and recreate cart_foods table (Example)

DROP TABLE IF EXISTS cart_foods CASCADE;
CREATE TABLE cart_foods (
  id SERIAL PRIMARY KEY NOT NULL,
  cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
  food_id INTEGER REFERENCES food_items(id) ON DELETE CASCADE,
  qty_food INTEGER DEFAULT 0
);
