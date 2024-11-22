const express = require("express");

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productCtrl");

const router = express.Router();

router.post("/create", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
