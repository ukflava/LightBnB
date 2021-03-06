const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
// We NEVER want to push keys/secrets to Github
// using a package like dotenv to progammatically include them
const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool
  .query(`SELECT * FROM users WHERE users.email = $1`, [email])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  let value = Object.values(user)
  return pool
  .query(`INSERT INTO users (name, email, password) VALUES ( $1, $2, $3 ) RETURNING *`, value)
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

  }
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);
  const querystring = `
  SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT 10;
  `
  return pool
  .query(querystring, [guest_id])
  .then((result) => {
    // console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};


exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
    // 1
    const queryParams = [];
    console.log(Object.values(options))
    // 2
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
        `;
  
    // 3
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night*100}`);
      queryString += `AND cost_per_night > $${queryParams.length} `;
    }
    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night*100}`);
      queryString += `AND cost_per_night < $${queryParams.length} `;
    }
    // if (options.minimum_rating) {
    //   queryParams.push(`${options.minimum_rating}`);
    //   queryString += `AND rating >= $${queryParams.length} `;
    // }
    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += `WHERE owner_id = $${queryParams.length} `;
    }

    // 4
    // queryParams.push(limit);
    // queryString += `
    // GROUP BY properties.id
    // ORDER BY cost_per_night
    // LIMIT $${queryParams.length};
    // `;
    queryString += `
    GROUP BY properties.id `
    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
    }

    // 4.1
    queryParams.push(limit);
    queryString += `ORDER BY cost_per_night LIMIT $${queryParams.length};
    `;
  
    // 5
    console.log(queryString, queryParams);
  
    // 6
    return pool.query(queryString, queryParams).then((res) => res.rows);
  
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryParams = Object.values(property);
    // console.log(property)
    // 2
    let queryString = `
    INSERT INTO properties (
      owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) 
      VALUES ( $14, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      ) RETURNING *;`;

// console.log(queryParams)
    return pool.query(queryString, queryParams).then((res) => res.rows);
}
exports.addProperty = addProperty;
