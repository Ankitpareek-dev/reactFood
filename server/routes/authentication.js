const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const CuisineModel = require("../models/Cuisine");
const auth = require("../middlewares/auth");

//this function will help create jwt token based on the role of the login user
const createToken = (userId, role, name) => {
  return jwt.sign({ userId, role, name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

authRouter.post("/signup/customer", async (req, res) => {
  const { name, email, password, role = "customer" } = req.body;
  const user = new UserModel({
    name,
    email,
    password,
    role: "customer",
  });
  try {
    await user.save();
    res.send({ name: name, role: role });
  } catch (err) {
    console.error(err);
  }
});

authRouter.post("/signup/restaurant", async (req, res) => {
  const { name, email, password, cuisines, image } = req.body;
  const user = new UserModel({
    name,
    email,
    password,

    role: "restaurant",
    photoUrl: image,
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
    // res.send(err);
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
    const token = createToken(user._id, user.role, user.name);
    // const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      sameSite: "lax", // or "none" if cross-origin with HTTPS
      secure: false, // true if using HTTPS (localhost = false)
      maxAge: 86400000, // 1 day
    });
    const { name, role, _id } = user;
    res.send({ name: name, role: role, userId: _id });
  } catch (err) {
    console.error(err.message);
  }
});

authRouter.post("/logout", auth, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // only if using HTTPS
    sameSite: "strict",
    path: "/", // should match the path used when setting cookie
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

authRouter.get("/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = authRouter;
