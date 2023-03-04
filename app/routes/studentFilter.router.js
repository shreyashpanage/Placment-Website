const router = require("express").Router();
const filterStudentController = require("../controllers/studentFilter.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

// router.post('/add', jwtMiddleware.verify, authMiddleware.ensureOfficialPlacementTeam, filterStudentController.add);
router.get(
  "/get",
  jwtMiddleware.verify,
  authMiddleware.ensureLoggedIn,
  filterStudentController.getAll
);

module.exports = router;
