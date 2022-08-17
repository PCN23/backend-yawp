-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS reviews CASCADE; 



CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE restaurants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    flavor TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL
);

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT,
    restaurant_id BIGINT,
    detail VARCHAR(500) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

INSERT INTO users ( username, email, password_hash)
VALUES (
  'hellocats',
  'hello@cats.com',
  '12345'
);

INSERT INTO restaurants (name, flavor, city, state) 
VALUES 
(
  'Burger King', 'burger', 'Austin', 'Texas'
) ,
(
  'King hamich', 'breakfast', 'Jonestown', 'Florida'
);

INSERT INTO reviews(
  user_id,
  restaurant_id,
  detail
)
VALUES (
  '1','1',
  'Burger was delicious'
);