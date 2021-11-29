-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS food_items CASCADE;
CREATE TABLE food_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  img_url VARCHAR(300) NOT NULL,
  price_in_cents INTEGER NOT NULL
);
