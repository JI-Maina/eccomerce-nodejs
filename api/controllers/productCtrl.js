const expressAsyncHandler = require("express-async-handler");
const slugify = require("slugify");

const Product = require("../models/productModel");

const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const findPoduct = await Product.findById(id);
    res.json(findPoduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const findProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const delProduct = await Product.findByIdAndDelete(id);

    res.json({ msg: "Product deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
