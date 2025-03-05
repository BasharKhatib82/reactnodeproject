import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/img/logo.png";
import Navbar from "./Navbar";
import "../App.css";

function Header() {
  return (
    <div className="header">
      <Navbar />

      <h1>מערכת לניהול פניות</h1>
      <Link to="/">
        <img className="logo" src={img} alt="logo" />
      </Link>
  
    </div>
  );
}

export default Header;
