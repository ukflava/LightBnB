DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
);



CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  thumbnail_photo VARCHAR(255) NOT NULL,
  cover_photo VARCHAR(255) NOT NULL,
  cost_per_night INTEGER NOT NULL,
  parking_spaces INTEGER DEFAULT 0,
  number_of_bedrooms INTEGER DEFAULT 0,
  number_of_bedrooms INTEGER DEFAULT 0,
  country VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(25) NOT NULL,
  post_code VARCHAR(20) NOT NULL,
  active boolean NOT NULL DEFAULT TRUE,
);


CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  start_date date NOT NULL,
  end_date date NOT NULL,
   property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE
 guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0,
  message TEXT NOT NULL,
  property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE
  guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE
);
