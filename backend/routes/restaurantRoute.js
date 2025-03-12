// backend/routes/restaurantRoute.js
const express = require("express");
const Restaurant = require("../models/Restaurant");
const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// POST endpoint to add a new restaurant (admin-protected)
router.post("/", authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const restaurantData = req.body;
    const newRestaurant = await Restaurant.create(restaurantData);
    res.status(201).json({ message: "Restaurant created", restaurant: newRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Error adding restaurant", error: error.message });
  }
});

// GET endpoint to fetch all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error: error.message });
  }
});

// GET endpoint to fetch a single restaurant by its ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant", error: error.message });
  }
});

// PUT endpoint to update a restaurant (admin-protected)
router.put("/:id", authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant updated", restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error: error.message });
  }
});

// DELETE endpoint to remove a restaurant by its ID (admin-protected)
router.delete("/:id", authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant removed", restaurant: deletedRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Error removing restaurant", error: error.message });
  }
});

// POST endpoint to add a food item to a restaurant (admin-protected)
router.post("/:id/fooditems", authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    if (!name || quantity === undefined) {
      return res.status(400).json({ message: "Food item name and quantity are required" });
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { $push: { availableFoodItems: { name, quantity } } },
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Food item added", restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Error adding food item", error: error.message });
  }
});

// PUT endpoint to update a food item in a restaurant (admin-protected)
router.put("/:id/fooditems/:foodItemName", authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const { id, foodItemName } = req.params;
    const { name, quantity } = req.body;
    // Update the matching food item; if a new name is provided, update it.
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: id, "availableFoodItems.name": foodItemName },
      { $set: { 
          "availableFoodItems.$.name": name || foodItemName, 
          "availableFoodItems.$.quantity": quantity 
      }},
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant or food item not found" });
    }
    res.status(200).json({ message: "Food item updated", restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Error updating food item", error: error.message });
  }
});

// DELETE endpoint to remove a food item from a restaurant (authenticated users)
router.delete("/:id/fooditems/:foodItemName", authMiddleware, async (req, res) => {
  try {
    const { id, foodItemName } = req.params;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { $pull: { availableFoodItems: { name: foodItemName } } },
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Food item deleted", restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food item", error: error.message });
  }
});

module.exports = router;
