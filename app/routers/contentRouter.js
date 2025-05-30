const { Router } = require("express");

const contentRouter = Router();
const contentController = require("../controllers/contentController");

contentRouter.get("/", contentController.notAuthContent);

module.exports = contentRouter;
