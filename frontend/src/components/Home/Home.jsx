import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "./Restaurant"; // Ensure this component is defined
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Home.css";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch restaurants when the restaurants section is shown
  useEffect(() => {
    if (showRestaurants) {
      axios
        .get("https://foodapp-mern-yg2z.onrender.com//api/restaurant")
        .then((res) => setRestaurants(res.data))
        .catch((err) =>
          console.error(
            "Error fetching restaurants:",
            err.response?.data || err.message
          )
        );
    }
  }, [showRestaurants]);

  const handleExplore = () => {
    if (!user) {
      // Redirect to login if not authenticated, passing the intended destination
      navigate("/login", { state: { from: "/restaurant-list" } });
    } else {
      // Show restaurants if logged in
      setShowRestaurants(true);
    }
  };

  return (
    <div className="home-container">
      {!showRestaurants && (
        <div className="overlay">
          <h1>Welcome to Our Food Donation App</h1>
          <button className="explore-btn" onClick={handleExplore}>
            Explore Restaurants
          </button>
        </div>
      )}

{showRestaurants && (
  <section className="restaurants-section">
    <h2>Restaurants</h2>
    <div className="restaurant-cards">
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))
      ) : (
        <p>No restaurants available.</p>
      )}
    </div>
  </section>
)}
    </div>
  );
};

export default Home;
