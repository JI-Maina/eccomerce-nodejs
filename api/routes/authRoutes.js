const express = require("express");

const {
  createUser,
  loginUser,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateUser,
} = require("../controllers/userCtrl");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getAUser);
router.delete("/users/:id", deleteAUser);
router.put("/users/:id", updateUser);

module.exports = router;
