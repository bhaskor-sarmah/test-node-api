const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser
} = require("../controller/user_controller");
const router = require("express").Router();
const { checktoken } = require("../middlewares/token_validation");
router.post("/", checktoken, createUser);
router.get("/", checktoken, getAllUsers);
router.get("/:id", checktoken, getUserById);
router.patch("/", checktoken, updateUserById);
router.delete("/:id", checktoken, deleteUserById);
router.post("/login", loginUser);

module.exports = router;
