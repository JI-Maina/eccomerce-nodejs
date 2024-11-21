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
  handleRefreshToken,
  logoutUser,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/refresh-token", handleRefreshToken);
router.get("/logout", logoutUser);

router.get("/users", authMiddleware, getAllUsers);
router.get("/users/:id", authMiddleware, isAdmin, getAUser);
router.delete("/users/:id", authMiddleware, deleteAUser);
router.put("/users/:id", authMiddleware, updateUser);
router.put("/users/block/:id", authMiddleware, isAdmin, blockUser);
router.put("/users/unblock/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
