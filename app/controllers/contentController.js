const db = require("../db/query");

async function getGuestContent(req, res) {
  try {
    const messages = await db.getAllPosts();
    res.render("index", { messages: messages });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

module.exports = {
  getGuestContent,
};
