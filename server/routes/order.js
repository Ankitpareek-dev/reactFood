const express = require("express");
const orderRouter = express.Router();
const OrderModel = require("../models/Orders");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

orderRouter.post("/order", auth, async (req, res) => {
  try {
    const { restaurantId, userId, items } = req.body;

    if (
      !restaurantId ||
      !userId ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({ message: "Invalid order data." });
    }

    const order = new OrderModel({
      restaurantId,
      userId,
      items,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully.",
      order: savedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while placing orders." });
  }
});

orderRouter.get("/orders", auth, async (req, res) => {
  const { userId, role } = req.user; // from auth middleware

  try {
    const filter = {};
    if (role === "restaurant") {
      filter.restaurantId = userId;
    } else if (role === "customer") {
      filter.userId = userId;
    } else {
      return res.status(403).json({ message: "Invalid role for orders." });
    }

    const orders = await OrderModel.find(filter).sort({ createdAt: -1 }).lean(); // faster & safer if you only read data, not mutate

    res.json(orders); // even if empty, return []
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
});

orderRouter.patch("/orders/:orderId/status", auth, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const { role, userId } = req.user;

  if (!["pending", "approved", "completed", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const isRestaurant =
      role === "restaurant" && order.restaurantId.toString() === userId;
    const isCustomer =
      role === "customer" && order.userId.toString() === userId;

    if (!isRestaurant && !isCustomer) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this order." });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated.", updatedOrder: order });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while updating order status." });
  }
});

module.exports = orderRouter;
