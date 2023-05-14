const router = require("express").Router();
const sendBulkMailController = require("../controllers/sendBulkMail.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/send",
  jwtMiddleware.verify,
  authMiddleware.ensureLoggedIn,
  sendBulkMailController.sendBulkEmails
);

module.exports = router;
