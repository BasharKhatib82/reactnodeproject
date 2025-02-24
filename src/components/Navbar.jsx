import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="menu">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "active-link" : "inactive-link"
        }
      >
        דף ראשי
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "active-link" : "inactive-link"
        }
      >
        אודות
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "active-link" : "inactive-link"
        }
      >
        צור קשר
      </NavLink>
    </div>
  );
}

export default Navbar;
