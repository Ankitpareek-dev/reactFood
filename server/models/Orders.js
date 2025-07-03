const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    itemName: String,
    itemPrice: Number,
    itemQuantity: Number,
    itemDescription: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderModel", OrderSchema);
