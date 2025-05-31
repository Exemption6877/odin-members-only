const db = require("../db/query");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

async function postLogIn(req, res) {
  const { email, password } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    const user = await db.userByEmail(email);

    if (!user || !user.password) {
      return res.send("No such user");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    return isMatch ? res.send("logged-in") : res.send("wrong log-in");
  } catch (err) {
    console.error("Error in postLogIn:", err);
    res.status(500).send("Something went wrong");
  }
}

async function postSignUp(req, res) {
  const { email, password, confirmPassword, first_name, last_name } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    const password_hash = await bcrypt.hash(password, saltRounds);

    if (password !== confirmPassword) {
      res.send("Confirm password is not matching");
    }

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

module.exports = {
  getSignUp,
  getLogIn,
  postLogIn,
  postSignUp,
};
