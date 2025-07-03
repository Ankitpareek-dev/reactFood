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

module.exports = orderRouter;
