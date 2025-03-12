const mongoose = require("mongoose");

// Define a sub-schema for food items
const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { _id: false }); // _id disabled if you don't need separate ids for each food item

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  contact: { type: String },
  // Adding available food items
  availableFoodItems: [FoodItemSchema]
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", RestaurantSchema);
