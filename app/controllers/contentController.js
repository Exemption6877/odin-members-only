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

async function postNewPost(req, res) {
  try {
    const { content } = req.body;
    const release_date = new Date();

    await db.insertNewPost(content, release_date, req.user.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

async function postDeletePost(req, res) {
  try {
    const { post_id } = req.params;

    await db.deletePost(post_id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

module.exports = {
  getGuestContent,
  postNewPost,
  postDeletePost,
};
