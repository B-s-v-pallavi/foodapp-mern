import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddRestaurant.css";

const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    location: "",
    contact: "",
  });

  // State for individual food item input
  const [foodItem, setFoodItem] = useState({
    name: "",
    quantity: "",
  });

  // State to hold all added food items
  const [foodItems, setFoodItems] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleFoodItemChange = (e) => {
    setFoodItem({ ...foodItem, [e.target.name]: e.target.value });
  };

  const addFoodItem = () => {
    if (!foodItem.name || !foodItem.quantity) {
      alert("Please provide both food item name and quantity.");
      return;
    }
    // Convert quantity to number and validate
    const quantity = parseInt(foodItem.quantity, 10);
    if (isNaN(quantity)) {
      alert("Quantity must be a number.");
      return;
    }
    setFoodItems([...foodItems, { name: foodItem.name, quantity }]);
    setFoodItem({ name: "", quantity: "" });
  };

  const removeFoodItem = (index) => {
    const updatedItems = foodItems.filter((_, idx) => idx !== index);
    setFoodItems(updatedItems);
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // Include availableFoodItems in the restaurant data
    const restaurantData = { ...restaurant, availableFoodItems: foodItems };

     axios
      .post("http://localhost:5000/api/restaurant", restaurantData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Restaurant added successfully!");
        setRestaurant({ name: "", description: "", location: "", contact: "" });
        setFoodItems([]);
      })
      .catch((err) => {
        console.error("Error adding restaurant:", err.response?.data || err.message);
        alert("Failed to add restaurant.");
      });
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add New Restaurant</h2>
      <form className="add-restaurant-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Restaurant Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter restaurant name"
            value={restaurant.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={restaurant.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={restaurant.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter contact info"
            value={restaurant.contact}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Available Food Items</h3>
        <div className="form-group food-item-input">
          <input
            type="text"
            name="name"
            placeholder="Food Item Name"
            value={foodItem.name}
            onChange={handleFoodItemChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={foodItem.quantity}
            onChange={handleFoodItemChange}
          />
          <button type="button" onClick={addFoodItem}>
            Add Food Item
          </button>
        </div>
        {foodItems.length > 0 && (
          <ul className="food-items-list">
            {foodItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity}{" "}
                <button type="button" onClick={() => removeFoodItem(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className="submit-btn">
          Add Restaurant
        </button>
      </form>
      <button className="back-btn" onClick={handleBack}>
        Back to Admin Dashboard
      </button>
    </div>
  );
};

export default AddRestaurant;
