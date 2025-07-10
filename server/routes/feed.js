const express = require("express");
const feedRouter = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const CuisineModel = require("../models/Cuisine");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

feedRouter.get("/feed/view/:restaurantId", auth, async (req, res) => {
  try {
    const cleanedId = req.params.restaurantId?.trim();

    const objectId = new mongoose.Types.ObjectId(cleanedId);
    const restaurant = await CuisineModel.find({ restaurantId: objectId });

    res.send(restaurant);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

feedRouter.get("/dashboard/:restaurantId", auth, async (req, res) => {
  try {
    const cleanedId = req.params.restaurantId?.trim();

    const objectId = new mongoose.Types.ObjectId(cleanedId);
    const restaurant = await CuisineModel.find({ restaurantId: objectId });

    res.send(restaurant);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

feedRouter.get("/feed", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const restaurentsData = await UserModel.find({ role: "restaurant" });
    const dataWithCuisineTitles = await Promise.all(
      restaurentsData.map(async (resto) => {
        const cuisineDocs = await CuisineModel.find(
          { restaurantId: resto._id },
          "cuisines"
        );

        const cuisineTitles = cuisineDocs.flatMap((doc) => {
          if (Array.isArray(doc.cuisines)) {
            return doc.cuisines.map((c) => c.cuisine);
          } else if (typeof doc.cuisines === "string") {
            return [doc.cuisines]; // single cuisine as string
          } else {
            return []; // skip malformed/empty
          }
        });

        return {
          ...resto.toObject(),
          cuisineTitles,
        };
      })
    );
    res.status(200).json(dataWithCuisineTitles);
  } catch (err) {
    console.error("Error fetching restaurants:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = feedRouter;
