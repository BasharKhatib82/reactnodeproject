import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../assets/styles/CreateLead.css';


function CreateLead() {
  const [newLead, setNewLead] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    course_name: "",
    city: "",
    status: "",
  });

  const [msg, setMsg] = useState({ style: "", text: "" });
  const navigate = useNavigate();

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
  
  // Handle form submission
  const handleSubmit =  (e) => {
    e.preventDefault();
    const cleanedLead = {
      first_name: cleanString(newLead.first_name),
      last_name: cleanString(newLead.last_name),
      phone_number: cleanString(newLead.phone_number),
      email: cleanString(newLead.email),
      course_name: cleanString(newLead.course_name),
      city: cleanString(newLead.city),
      status: cleanString(newLead.status),
      
    };

    if (
      !cleanedLead.first_name ||
      !cleanedLead.last_name ||
      !cleanedLead.phone_number||
      !cleanedLead.email ||
      !cleanedLead.course_name||
      !cleanedLead.city||
      !cleanedLead.status
      
    ) {
      setMsg({
        classText: "error",
        text: "Please fill in all the required fields.",
      });
      return;
    }

    if (cleanedLead.phone_number.length !== 10) {
      setMsg({
        classText: "error",
        text: "The Phone Number length must be 10 Numbers",
      });
      return;
    }
    try {
      // שליחת נתונים לשרת
      const response =  axios.post("http://localhost:8801/api/leads/new", cleanedLead);
  
      // אם הבקשה הצליחה
      setMsg({
        classText: "success",
        text: "הפנייה נוצרה בהצלחה!",
      });
  
      // ניווט חזרה לדף פניות
      setTimeout(() => {
        navigate("/api/leads");
      }, 3000);
      
    } catch (error) {
      // טיפול בשגיאות
      console.error("Error creating lead:", error);
      setMsg({
        classText: "error",
        text: "אירעה שגיאה בעת יצירת הפניה.",
      });
    }

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
              name="first_name"
              value={newLead.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>שם משפחה :</label>
            <input
              type="text"
              name="last_name"
              value={newLead.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>מספר טלפון :</label>
            <input
              type="text"
              name="phone_number"
              value={newLead.phone_number}
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
            <label>שם קורס :</label>
            <input
              type="text"
              name="course_name"
              value={newLead.course_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>עיר :</label>
            <input
              type="text"
              name="city"
              value={newLead.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>סטטוס :</label>
            <input
              type="text"
              name="status"
              value={newLead.status}
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
