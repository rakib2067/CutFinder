DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id serial PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    verified BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS barbershops;

CREATE TABLE barbershops
(
    barbershop_id serial PRIMARY KEY,
    shop_name VARCHAR(200) NOT NULL,
    store_number VARCHAR(100) NOT NULL 
);

DROP TABLE IF EXISTS barbershop_managers;

CREATE TABLE barbershop_managers
(
    user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
    barbershop_id INT REFERENCES barbershops (barbershop_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, barbershop_id)
);

DROP TABLE IF EXISTS barbers;

CREATE TABLE barbers
(
    barber_id serial PRIMARY KEY,
    user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
    barbershop_id INT REFERENCES barbershops(barbershop_id)
);

DROP TABLE IF EXISTS barbershop_addresses;

CREATE TABLE barbershop_addresses (
    address_id SERIAL PRIMARY KEY,
    barbershop_id INT REFERENCES barbershops(barbershop_id) ON DELETE CASCADE,
    street_address VARCHAR(255),
    city VARCHAR(50) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    country VARCHAR(100) DEFAULT 'United Kingdom'
);

DROP TABLE IF EXISTS user_addresses;

CREATE TABLE user_addresses (
    address_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    street_address VARCHAR(255),
    city VARCHAR(50) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    country VARCHAR(100) DEFAULT 'United Kingdom'
);

DROP TABLE IF EXISTS hairstyles;

CREATE TABLE hairstyles
(
    hairstyle_id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS bookings;

CREATE TABLE bookings
(
    booking_id serial PRIMARY KEY,
    booking_day VARCHAR(100),
    hairstyle_id INT REFERENCES hairstyles(hairstyle_id),
    customer_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    barber_id INT REFERENCES barbers(barber_id)
);

DROP TABLE IF EXISTS barber_skills;

CREATE TABLE barber_skills
(
    hairstyle_id INT REFERENCES hairstyles(hairstyle_id) ON DELETE CASCADE,
    barber_id INT REFERENCES barbers(barber_id) ON DELETE CASCADE,
    PRIMARY KEY (hairstyle_id, barber_id)

);

DROP TABLE IF EXISTS barbershopPrices;

CREATE TABLE barbershop_prices 
(
    hairstyle_id INT REFERENCES hairstyles(hairstyle_id) ON DELETE CASCADE,
    barbershop_id INT REFERENCES barbershops(barbershop_id) ON DELETE CASCADE,
    price DECIMAL(10, 2), 
    PRIMARY KEY (hairstyle_id, barbershop_id)
);

