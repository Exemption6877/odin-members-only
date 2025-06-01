const db = require("../db/query");
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

async function postSignUp(req, res) {
  const { email, password, first_name, last_name } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    const existingUser = await db.userByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already registered" }] });
    }

    const password_hash = await bcrypt.hash(password, saltRounds);

    await db.createUser(email, password_hash, first_name, last_name);
    res.redirect("/");
  } catch (err) {
    console.error("Error in postSignUp:", err);
    res.status(500).send("Something went wrong");
  }
}

async function getSignUp(req, res) {
  res.render("auth", { method: "sign-up" });
}

async function getLogIn(req, res) {
  res.render("auth", { method: "log-in" });
}

async function getMembership(req, res) {
  res.render("auth", { method: "membership" });
}

async function postMembership(req, res) {
  const validationErrors = validationResult(req);

  try {
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await db.updateMembership(req.user.email);
    res.redirect("/");
  } catch (err) {
    console.error("Error in postSignUp:", err);
    res.status(500).send("Something went wrong");
  }
}

module.exports = {
  getSignUp,
  getLogIn,
  postSignUp,
  getMembership,
  postMembership,
};
