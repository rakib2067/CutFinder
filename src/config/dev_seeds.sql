INSERT INTO users (full_name, email, password)
VALUES
('Rakib','a@a.cob', 'pass'),
('Ismael','i@i.cob', 'pass'),
('Tanweer','t@t.cob', 'pass'),
('Imran','im@im.cob', 'pass'),
('Bob','b@b.cob', 'pass'),
('Tom','to@to.cob', 'pass'),
('John','j@j.cob', 'pass'),
('Harry','h@h.cob', 'pass'),
('Terry','te@te.cob', 'pass'),
('John Cena','jc@jc.cob', 'pass'),
('Mat','m@m.cob', 'pass'),
('Manager','manager@gmail.con', 'testing123');


INSERT INTO barbershops (shop_name, store_number)
VALUES
('Smokeys Barbers', '02082329323');

INSERT INTO barbershop_managers(user_id, barbershop_id)
VALUES
(11, 1);

INSERT INTO user_addresses (user_id, street_address, city, postal_code)
VALUES
(4, '19 Mare street', 'London', 'E96NS');

INSERT INTO barbershop_addresses (barbershop_id, street_address, city, postal_code)
VALUES
(1, '120 Windsor Road', 'London', 'E70EJ');

INSERT INTO barbers (user_id, barbershop_id)
VALUES
(1, 1),
(2, 1),
(3, 1);

INSERT INTO hairstyles (name)
VALUES
('Low Fade'),
('Taper Fade'),
('High Fade'),
('Medium Fade');

INSERT INTO barbershop_prices (hairstyle_id, barbershop_id, price)
VALUES
(1,1, 10.00),
(2,1, 15.00),
(3,1, 25.00),
(4,1, 20.00);

INSERT INTO barber_skills (hairstyle_id, barber_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(1, 2);


INSERT INTO bookings (booking_day, customer_id, barber_id, hairstyle_id)
VALUES
('Monday 11th August',5, 1, 1),
('Monday 13th August',6, 1, 2),
('Wednesday 17th September',7, 2, 3),
('Tuesday 29th October',8, 3, 1),
('Saturday 31st July',9, 2, 1),
('Monday 18th January',10, 3, 1);
