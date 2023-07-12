require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {UsersModel} = require("../model/users");
const {CartModel} = require('../model/cart');
const secretKey = process.env.SECRET_KEY;

const saltRounds = 10;

// // User registration endpoint
const register = async (req, res) => {
  try {
    const userInfo = req.body;
    // Check if user already exists
    const existingUser = await UsersModel.findOne({ mobile:userInfo.mobile });
    if (existingUser) {
      return res.json({ message: "Registered user; try to LogIn !" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
    userInfo.password = hashedPassword;
    // Create a new user
    await UsersModel.create(userInfo);
    // Create cart
    const user = await UsersModel.findOne({mobile:userInfo.mobile})
    const userId = (user._id).toString();
    await CartModel.create({userId:userId});
    res.status(200).json({ message: "User registered successfully !" });
  } 
  catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

// // User login endpoint
const login = async (req, res) => {
  try {
    const loginData = req.body;
    // Find the user
    const user = await UsersModel.findOne({ mobile:loginData.mobile });
    if (!user) {
      return res.json({ message: "New user try to SignUp first !" });
    }
    // Compare the password
    const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Invalid Credinals !" });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, userName: user.name }, secretKey, {expiresIn: "12h"});
    // Count of items in the cart
    const cartinfo = await CartModel.findOne({userId:user._id});
    const productCount = cartinfo.productIds.length
    return res.json({message:"logged in Successfully !", Token:token, userName: user.name, count:productCount});
  }
  catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

module.exports={
    register,
    login
}