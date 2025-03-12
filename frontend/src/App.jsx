import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/Navigation/Navigation";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddRestaurant from "./components/Admin/AddRestaurant";
import RestaurantDetails from "./components/Admin/RestaurantDetails.jsx";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-restaurant" element={<AddRestaurant />} />
        <Route path="/admin/restaurant/:id" element={<RestaurantDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
