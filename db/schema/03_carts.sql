-- Drop and recreate carts table (Example)

DROP TABLE IF EXISTS carts CASCADE;
CREATE TABLE carts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  submitted_time TIMESTAMP NOT NULL,
  duration_in_seconds SMALLINT DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  notes text
);
