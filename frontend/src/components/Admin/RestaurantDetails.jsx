import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./RestaurantDetails.css";

const RestaurantDetails = () => {
  const { id } = useParams(); // Get restaurant ID from URL
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFoodItems, setShowFoodItems] = useState(false); // Toggle for food items visibility

  // Fetch restaurant details when component mounts
  useEffect(() => {
     axios
      .get(`https://foodapp-mern-yg2z.onrender.com/api/restaurant/${id}`)
      .then((res) => {
        setRestaurant(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data.message || err.message);
        setLoading(false);
      });
  }, [id]);

  // Function to handle "Take" button click that deletes a food item
  const handleTake = async(foodItemName) => {
    const token = localStorage.getItem("token");
    await axios
      .delete(`https://foodapp-mern-yg2z.onrender.com/api/restaurant/${id}/fooditems/${foodItemName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Update local state to remove the taken food item
        const updatedFoodItems = restaurant.availableFoodItems.filter(
          (item) => item.name !== foodItemName
        );
        setRestaurant({ ...restaurant, availableFoodItems: updatedFoodItems });
      })
      .catch((err) => {
        console.error("Error taking food item:", err.response?.data || err.message);
        alert("Failed to take food item.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurant) return <p>Restaurant not found.</p>;

  return (
    <div className="restaurant-details-card">
      <h2 className="head">{restaurant.name}</h2>
      <p>
        <strong>Description:</strong> {restaurant.description}
      </p>
      <p>
        <strong>Location:</strong> {restaurant.location}
      </p>
      <p>
        <strong>Contact:</strong> {restaurant.contact}
      </p>

      <h3 class="ht">Available Food Items</h3>
      {restaurant.availableFoodItems && restaurant.availableFoodItems.length > 0 ? (
        <>
          <button onClick={() => setShowFoodItems(!showFoodItems)}>
            {showFoodItems ? "Hide Food Items" : "View Available Food Items"}
          </button>
          {showFoodItems && (
            <table className="food-items-table">
              <thead>
                <tr>
                  <th>Food Item</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {restaurant.availableFoodItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button onClick={() => handleTake(item.name)}>Take</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p>No food items available.</p>
      )}

      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>
    </div>
  );
};

export default RestaurantDetails;
