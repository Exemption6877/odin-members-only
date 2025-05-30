async function getSignUp(req, res) {
  res.render("auth", { method: "sign-up" });
}

async function getLogIn(req, res) {
  res.render("auth", { method: "log-in" });
}

module.exports = {
  getSignUp,
  getLogIn,
};
