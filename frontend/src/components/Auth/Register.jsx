import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("https://foodapp-mern-yg2z.onrender.com//api/auth/signup", formData)
      .then((res) => {
        console.log("Registration successful", res);
        if (res.status === 201) {
          const { token, role } = res.data;
          setUser({ token, role });
          localStorage.setItem("token", token);
          // If registered user is admin, redirect to admin dashboard
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.error("Registration Error:", err.response?.data || err.message);
        alert("Registration failed: " + (err.response?.data.message || "Error"));
      });
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Mobile Number"
            name="mobile"
            onChange={handleChange}
            required
          />
        </div>
        <button className="register-btn" type="submit">Register</button>
      </form>
    </div>
  );
}
