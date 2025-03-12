import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navigation.css";

const Navigation = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>
          {user ? (
            <>
              {user.role === "admin" && (
                <Link className="admin-btn" to="/admin/add-restaurant">
                  Add Restaurant
                </Link>
              )}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
