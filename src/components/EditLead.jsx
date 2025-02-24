import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/EditPost.css";

function EditLead() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the lead from the state passed via Link
  const { post } = location.state;

  // Store the lead as a single object in the state
  const [editedLead, setEditedLead] = useState({ ...post });

  // Function to handle each field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLead((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  // Function for saving changes
  const handleSubmit = (e) => {
    e.preventDefault();
    // Data saving will be processed here
    console.log("Updated Lead:", editedLead);

    // After saving, redirect back to the main page
    navigate("/");
  };

  return (
    <div className="main">
      <h2>עדכון פנייה</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם פרטי :</label>
          <input
            type="text"
            name="firstName"
            value={editedLead.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>שם משפחה :</label>
          <input
            type="text"
            name="lastName"
            value={editedLead.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>דואר אלקטרוני :</label>
          <input
            type="text"
            name="email"
            value={editedLead.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>מספר טלפון :</label>
          <input
            type="text"
            name="phoneNumber"
            value={editedLead.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">עדכן</button>
      </form>
    </div>
  );
}

export default EditLead;
