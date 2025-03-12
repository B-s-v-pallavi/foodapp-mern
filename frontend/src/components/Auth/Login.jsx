import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("https://foodapp-mern-yg2z.onrender.com/api/auth/login", formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const { token, role } = res.data;
          setUser({ token, role });
          localStorage.setItem("token", token);
          
          // If the user is an admin, redirect to the Admin Dashboard
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.error("Login failed:", err.response?.data || err.message);
        alert("Login failed: " + (err.response?.data.message || "Error"));
      });
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-group">
          <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
        </div>
        <button className="login-btn" type="submit">Login</button>
      </form>
    </div>
  );
}
