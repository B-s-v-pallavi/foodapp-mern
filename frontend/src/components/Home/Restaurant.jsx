import React from "react";
import { Link } from "react-router-dom";
import "./Restaurant.css";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <h3 className="restaurant-name">{restaurant.name}</h3>

      <p className="restaurant-location pt">{restaurant.location}</p>
      <p className="restaurant-contact pt">{restaurant.contact}</p>
      <div class="text-center">
      <Link className="restaurant-link" to={`/admin/restaurant/${restaurant._id}`}>
        View Details
      </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
