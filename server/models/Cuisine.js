const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const CategorySchema = new mongoose.Schema({
  heading: String,
  items: [ItemSchema],
});

const CuisineSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  name: {
    type: String,
    ref: "UserModel",
    required: true,
  },
  cuisines: { type: String, required: true },
  categories: [CategorySchema],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CuisineModel", CuisineSchema);
