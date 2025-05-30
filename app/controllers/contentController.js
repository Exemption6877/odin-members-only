async function notAuthContent(req, res) {
  res.render("index");
}

module.exports = {
  notAuthContent,
};
