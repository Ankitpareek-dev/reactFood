const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const CuisineModel = require("../models/Cuisine");

//this function will help create jwt token based on the role of the login user
const createToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

authRouter.post("/signup/customer", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new UserModel({
    name,
    email,
    password,
    role: "customer",
  });
  try {
    await user.save();
    res.send("user created successfully");
  } catch (err) {
    console.error(err);
  }
});

authRouter.post("/signup/restaurent", async (req, res) => {
  const { name, email, password, cuisines } = req.body;
  const user = new UserModel({
    name,
    email,
    password,

    role: "restaurent",
    photoUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
  });

  try {
    const savedUser = await user.save();
    for (const cuisine of cuisines) {
      const cuisineData = new CuisineModel({
        restaurantId: savedUser._id,
        name: savedUser.name,
        cuisines: cuisine.cuisine, // string like "Italian"
        categories: cuisine.categories, // array of categories
      });
      await cuisineData.save();
    }

    res.send("user created successfully");
  } catch (err) {
    console.error(err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send("invalid email or password");
    }
    const token = createToken(user._id, user.role);
    // const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      sameSite: "lax", // or "none" if cross-origin with HTTPS
      secure: false, // true if using HTTPS (localhost = false)
      maxAge: 86400000, // 1 day
    });
    const { name, role } = user;
    res.send({ name: name, role: role });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = authRouter;
