DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id serial PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL
);

DROP TABLE IF EXISTS barbershops;

CREATE TABLE barbershops
(
    barbershop_id serial PRIMARY KEY,
    shopname VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL UNIQUE,
    storenumber VARCHAR(100) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS barbers;

CREATE TABLE barbers
(
    barber_id serial PRIMARY KEY,
    user_id INT REFERENCES users (id),
    barbershop_id INT REFERENCES barbershops(barbershop_id)
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
    customer_id INT REFERENCES users (id),
    barber_id INT REFERENCES barbers (barber_id),
    hairstyle_id INT REFERENCES hairstyles (hairstyle_id)
);

DROP TABLE IF EXISTS barberSkills;

CREATE TABLE barberSkills
(
    hairstyle_id INT REFERENCES hairstyles(hairstyle_id),
    barber_id INT REFERENCES barbers(barber_id),
    PRIMARY KEY (hairstyle_id, barber_id)

);

DROP TABLE IF EXISTS barbershopPrices;

CREATE TABLE barbershopPrices 
(
    hairstyle_id INT REFERENCES hairstyles(hairstyle_id),
    barbershop_id INT REFERENCES barbershops(barbershop_id),
    price DECIMAL(10, 2), 
    PRIMARY KEY (hairstyle_id, barbershop_id)
);

