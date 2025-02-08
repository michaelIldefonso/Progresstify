 // config/db.js
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // SSL settings for secure connection
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');
  } catch (err) {
    console.error('Database connection error', err.stack);
  }
};

module.exports = { client, connectDB }; // Export to be used in other parts of the app
