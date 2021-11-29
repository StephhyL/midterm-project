-- Drop and recreate carts table (Example)

DROP TABLE IF EXISTS carts CASCADE;
CREATE TABLE carts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  submitted_time TIMESTAMP DEFAULT now(),
  duration_in_seconds SMALLINT DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  total_in_cents INTEGER NOT NULL DEFAULT 0,
  notes text
);
