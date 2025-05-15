const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/user.controller");

router.get("/me", auth, getProfile);
router.put("/me", auth, updateProfile);
router.put("/me/password", auth, changePassword);

module.exports = router;