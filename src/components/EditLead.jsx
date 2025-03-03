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
    const { name, value, type, checked } = e.target;
    setEditedLead((prevPost) => ({
      ...prevPost,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function for saving changes
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Lead:", editedLead);
    navigate("/");
  };

  return (
    <div className="main">
      <div className="create-lead">
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
            type="email"
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
        <div>
          <label>תאריך לידה :</label>
          <input
            type="date"
            name="birthDate"
            value={editedLead.birthDate || ""}
            onChange={handleChange}
          />
        </div>
        <div>
           <label>בחירת קורס :</label>
          <select
            name="inquiryType"
            value={editedLead.inquiryType || ""}
            onChange={handleChange}
          >
              <option value="">בחר קורס</option>
              <option value="support">הנחיית קבוצות</option>
              <option value="sales">מדאיך בכיר באומנות</option>
              <option value="general">טיפול בבישול</option>
          </select>
        </div>
        <div>
          <label>אופן יצירת קשר מועדף :</label>
          <div>
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={editedLead.preferredContact === "email"}
              onChange={handleChange}
            /> דוא"ל
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={editedLead.preferredContact === "phone"}
              onChange={handleChange}
            /> טלפון
          </div>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="subscribeNewsletter"
              checked={editedLead.subscribeNewsletter || false}
              onChange={handleChange}
            /> הירשם לקבלת עדכונים במייל
          </label>
        </div>
        <button type="submit">עדכן</button>
      </form>
      </div>
    </div>
  );
}

export default EditLead;
