const { Pool } = require("pg");

require("dotenv").config({ path: "../.env" });

module.exports = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});
