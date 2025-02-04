import React, { useState } from "react";
import "../assets/styles/CreateLead.css";

function CreateLead({ addLead }) {
  const [newLead, setNewLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [msg, setMsg] = useState({ style: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  const cleanString = (str) => {
    return str.trim().replace(/\s+/g, " ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedLead = {
      firstName: cleanString(newLead.firstName),
      lastName: cleanString(newLead.lastName),
      email: cleanString(newLead.email),
      phoneNumber: cleanString(newLead.phoneNumber),
    };

    if (
      !cleanedLead.firstName ||
      !cleanedLead.lastName ||
      !cleanedLead.email ||
      !cleanedLead.phoneNumber
    ) {
      setMsg({
        classText: "error",
        text: "Please fill in all the required fields.",
      });
      return;
    }

    if (cleanedLead.phoneNumber.length !== 10) {
      setMsg({
        classText: "error",
        text: "The Phone Number length must be 10 Numbers",
      });
      return;
    }

    addLead(cleanedLead); // הוספת הליד החדש לרשימה
    setNewLead({ firstName: "", lastName: "", email: "", phoneNumber: "" }); // איפוס השדות
    setMsg({
      classText: "success",
      text: "פנייה נשלחה",
    });
  };

  return (
    <div className="main">
      <div className="create-lead">
        <h2>פנייה חדשה</h2>
        {msg.text && <p className={msg.classText}>{msg.text}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>שם פרטי :</label>
            <input
              type="text"
              name="firstName"
              value={newLead.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>שם משפחה :</label>
            <input
              type="text"
              name="lastName"
              value={newLead.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>דואר אלקטרוני :</label>
            <input
              type="email"
              name="email"
              value={newLead.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>מספר טלפון :</label>
            <input
              type="text"
              name="phoneNumber"
              value={newLead.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">יצירת פנייה</button>
        </form>
      </div>
    </div>
  );
}

export default CreateLead;
