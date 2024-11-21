const express = require("express");

const {
  createUser,
  loginUser,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateUser,
  blockUser,
  unBlockUser,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", authMiddleware, isAdmin, getAUser);
router.delete("/users/:id", deleteAUser);
router.put("/users/:id", updateUser);
router.put("/users/block/:id", authMiddleware, isAdmin, blockUser);
router.put("/users/unblock/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
