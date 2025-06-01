const pool = require("./pool");

async function isEmailTaken(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  return result.rows.length > 0;
}

async function userByEmail(email) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE email = $1 LIMIT 1`,
    [email]
  );

  return rows[0];
}

async function authUser(email, password) {
  const result = await pool.query(
    `SELECT first_name FROM users WHERE email = $1 AND password = $2`,
    [email, password]
  );

  return result.rows.length > 0;
}

async function createUser(email, password, first_name, last_name) {
  const emailTaken = await isEmailTaken(email);
  if (emailTaken) {
    throw new Error("User already exists.");
  }

  await pool.query(
    `INSERT INTO users (email, password, first_name, last_name)
    VALUES ($1, $2, $3, $4)
    `,
    [email, password, first_name, last_name]
  );
}

async function updateMembership(email) {
  await pool.query(`UPDATE users SET membership = TRUE WHERE email = $1`, [
    email,
  ]);
}

async function getAllPosts() {
  const { rows } = await pool.query(
    `SELECT posts.id, content, release_date, first_name, last_name FROM posts
JOIN users ON user_id = users.id
ORDER BY release_date`
  );
  return rows;
}

async function insertNewPost(content, release_date, user_id) {
  await pool.query(
    `INSERT INTO posts (content, release_date, user_id) VALUES ($1, $2, $3)`,
    [content, release_date, user_id]
  );
}

async function deletePost(post_id) {
  await pool.query(`DELETE FROM posts WHERE id = $1`, [post_id]);
}

module.exports = {
  isEmailTaken,
  userByEmail,
  authUser,
  createUser,
  updateMembership,
  getAllPosts,
  insertNewPost,
  deletePost,
};
