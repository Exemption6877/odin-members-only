const { Router } = require("express");

const passport = require("passport");
const contentRouter = Router();
const { body } = require("express-validator");
const contentController = require("../controllers/contentController");
const authController = require("../controllers/authController");

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

function checkMembership(req, res, next) {
  if (!req.user) {
    return res.redirect("/");
  }

  if (req.user.membership) {
    return res.redirect("/");
  }

  next();
}

function checkAdmin(req, res, next) {
  if (!req.user) {
    return res.redirect("/");
  }

  if (!req.user.admin) {
    return res.redirect("/");
  }
  next();
}

contentRouter.get("/", contentController.getGuestContent);

contentRouter.get("/sign-up", checkAuth, authController.getSignUp);
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
        throw new Error("Password does not match.");
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

contentRouter.get("/log-in", checkAuth, authController.getLogIn);
contentRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/nope",
  })
);

contentRouter.post("/log-out", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

contentRouter.get("/membership", checkMembership, authController.getMembership);

contentRouter.post(
  "/membership",
  [
    body("secret").custom((value) => {
      if (value !== process.env.MEMBER_SECRET) {
        throw new Error("Secret password is incorrect.");
      }

      return true;
    }),
  ],
  authController.postMembership
);

contentRouter.post(
  "/newpost",
  [body("content").trim().notEmpty()],
  contentController.postNewPost
);

contentRouter.post(
  "/delete/:post_id",
  checkAdmin,
  contentController.postDeletePost
);

module.exports = contentRouter;
