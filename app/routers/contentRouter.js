const { Router } = require("express");

const passport = require("passport");
const contentRouter = Router();
const { body } = require("express-validator");
const contentController = require("../controllers/contentController");
const authController = require("../controllers/authController");

contentRouter.get("/", contentController.getGuestContent);

contentRouter.get("/sign-up", authController.getSignUp);
contentRouter.post(
  "/sign-up",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email"),

    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Password is required"),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password does not match");
      }
      return true;
    }),

    body("first_name")
      .notEmpty()
      .trim()
      .withMessage("First name must not be empty."),

    body("last_name")
      .notEmpty()
      .trim()
      .withMessage("Last name must not be empty."),
  ],
  authController.postSignUp
);

contentRouter.get("/log-in", authController.getLogIn);
contentRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/nope",
  })
);

module.exports = contentRouter;
