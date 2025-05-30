const bcrypt = require("bcryptjs");
const db = require("../db/query");

async function postLogIn(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const result = await db.authUser(email, password);

  return result ? res.send("logged-in") : res.send("wrong log-in");
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
};
