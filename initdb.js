// initDb.js
const fs = require("fs");
const path = require("path");
const pool = require("./app/db/pool");

async function initDb() {
  try {
    await pool.query("SELECT 1 FROM users LIMIT 1");
    console.log("Database already initialized.");
  } catch (err) {
    if (err.code === "42P01") {
      console.log("Initializing database...");
      const initSql = fs.readFileSync(path.join(__dirname, "init.sql"), "utf8");
      await pool.query(initSql);
      console.log("Database initialized.");
    } else {
      console.error("Unexpected DB error during init:", err);
    }
  }
}

module.exports = initDb;
