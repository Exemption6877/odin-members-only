const db = require("../db/query");
const { formatRelative } = require("date-fns");

async function getGuestContent(req, res) {
  try {
    const messages = await db.getAllPosts();
    const formattedMessages = messages.map((message) => {
      const formattedDate = formatRelative(
        new Date(message.release_date),
        new Date()
      );
      return { ...message, release_date: formattedDate };
    });

    res.render("index", { messages: formattedMessages });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

module.exports = {
  getGuestContent,
};
