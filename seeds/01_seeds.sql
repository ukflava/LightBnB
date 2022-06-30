INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

    INSERT INTO users (
    name, email, password) 
    VALUES (
    'user1', 'ariaa@e.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
    INSERT INTO users (
    name, email, password) 
    VALUES (
    'user2', 'j@a.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
    INSERT INTO users (
    name, email, password) 
    VALUES (
    'user3', 'eli@y.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');



INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
    VALUES (
    'Villa1', 'description', www, www, 10000, 1, 1, 1, true, 'province', 'city', 'country', 'street', 'post_code');
    
    INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
    VALUES (
    'Villa2', 'description', www, www, 200000, 2, 2, 2, true, 'province', 'city', 'country', 'street', 'post_code');
    INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
    VALUES (
    'Villa3', 'description', www, www, 300000, 3, 3, 3, true, 'province', 'city', 'country', 'street', 'post_code');


     INSERT INTO property_reviews (
    guest_id, property_id, reservation_id, rating, message) 
    VALUES (
    1, 1, 1, 1, 'message');
         INSERT INTO property_reviews (
    guest_id, property_id, reservation_id, rating, message) 
    VALUES (
    2, 2, 2, 2, 'message');
         INSERT INTO property_reviews (
    guest_id, property_id, reservation_id, rating, message) 
    VALUES (
    3, 3, 3, 3, 'message');
  