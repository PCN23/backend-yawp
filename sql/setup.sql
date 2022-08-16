-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS restaurants;


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

INSERT INTO restaurants (name, flavor, city, state) 
VALUES 
(
  'Burger King', 'burger', 'Austin', 'Texas'
) ,
(
  'King hamich', 'breakfast', 'Jonestown', 'Florida'
);