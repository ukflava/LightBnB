-- SELECT reservations.id, properties.title, reservations.start_date, properties.cost_per_night, AVG(property_reviews.rating) as average_rating
-- FROM SELECT(reservations



-- GROUP BY reservations.id

SELECT DISTINCT reservations.id, properties.title, reservations.start_date, properties.cost_per_night, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON property_reviews.property_id = properties.id
JOIN users on users.id = reservations.guest_id
WHERE users.email = 'tristanjacobs@gmail.com'
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
-- --  GROUP BY guest_id

-- SELECT AVG(property_reviews.rating) FROM property_reviews GROUP BY property_reviews.property_id

