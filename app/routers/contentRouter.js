const { Router } = require("express");

const contentRouter = Router();

const contentController = require("../controllers/contentController");
const authController = require("../controllers/authController");

contentRouter.get("/", contentController.getGuestContent);

contentRouter.get("/sign-up", authController.getSignUp);
contentRouter.post("/sign-up", authController.postSignUp);

contentRouter.get("/log-in", authController.getLogIn);
contentRouter.post("/log-in", authController.postLogIn);

module.exports = contentRouter;
