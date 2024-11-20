const express = require("express");

const {
  createUser,
  loginUser,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateUser,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", authMiddleware, isAdmin, getAUser);
router.delete("/users/:id", deleteAUser);
router.put("/users/:id", updateUser);

module.exports = router;
