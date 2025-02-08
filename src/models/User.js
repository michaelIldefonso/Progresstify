const { client } = require('../config/db'); // Import the database client

const getUsers = async () => {
  try {
    const result = await client.query('SELECT * FROM users'); // Query to fetch users
    return result.rows; // Return the list of users
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

module.exports = { getUsers }; // Export the function to be used in routes
