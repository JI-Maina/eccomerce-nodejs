const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshToken");

const createUser = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    // create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });

  if (findUser && findUser.isPasswordMatched(password)) {
    const refreshToken = generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser?._id,
      { refresh: refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// refresh Token
const handleRefreshToken = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");

  const refresh = cookie.refreshToken;
  const user = await User.findOne({ refresh });

  if (!user) throw new Error("No Refresh token present");
  jwt.verify(refresh, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }

    const accessToken = generateToken(user.id);

    res.json({ accessToken });
  });
  res.json(user);
});

// logout
const logoutUser = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");

  const refresh = cookie.refreshToken;
  const user = await User.findOne({ refresh });

  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    res.sendStatus(204);
  }

  await User.findOneAndUpdate(
    { refresh },
    {
      token: "",
    },
    { new: true }
  );
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  res.sendStatus(204);
});

// get all users
const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// fetch user
const getAUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const findUser = await User.findById(id);
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

// delete user
const deleteAUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const findUser = await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

// update user
const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Block user
const blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const findUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );

    res.json({ message: "User Blocked" });
  } catch (error) {
    throw new Error(error);
  }
});

const unBlockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const findUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );

    res.json({ message: "User Un-blocked" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getAUser,
  updateUser,
  deleteAUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logoutUser,
};
