const express = require("express");
const orderRouter = express.Router();
const OrderModel = require("../models/Orders");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

orderRouter.post("/order", auth, async (req, res) => {
  const {
    restaurantId,
    itemName,
    itemPrice,
    itemDescription,
    itemQuantity,
    userId,
  } = req.body;

  const order = new OrderModel({
    restaurantId,
    userId,
    itemName,
    itemPrice,
    itemQuantity,
    itemDescription,
    status: "pending",
  });
  try {
    await order.save();
    res.send("successful");
  } catch (err) {
    res.status(400).send(err);
  }
});

orderRouter.get("/orders", auth, async (req, res) => {
  const { userId, role } = req.user; // injected from token

  try {
    let filter = {};
    if (role === "restaurant") {
      filter.restaurantId = userId;
    } else if (role === "customer") {
      filter.userId = userId;
    } else {
      return res.status(403).json({ message: "Invalid role for orders." });
    }

    const orders = await OrderModel.find(filter).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
});

module.exports = orderRouter;
