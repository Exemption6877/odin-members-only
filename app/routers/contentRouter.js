const { Router } = require("express");

const contentRouter = Router();

const contentController = require("../controllers/contentController");
const authController = require("../controllers/authController");

contentRouter.get("/", contentController.getGuestContent);

contentRouter.get("/sign-up", authController.getSignUp);

module.exports = contentRouter;
