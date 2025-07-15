const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: String,
  itemPrice: Number,
  itemQuantity: Number,
  itemDescription: String,
});

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
    items: [ItemSchema],
    status: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderModel", OrderSchema);
