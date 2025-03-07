import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/CreateLead.css";

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

  const [msg, setMsg] = useState({ classText: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  const cleanString = (str) =>
    typeof str === "string" ? str.trim().replace(/\s+/g, " ") : str;

  const handleSubmit = async (e) => {
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

    if (Object.values(cleanedLead).some((value) => value === "")) {
      setMsg({ classText: "error", text: "יש למלא את כל השדות החובה." });
      return;
    }

    if (!/^\d{10}$/.test(cleanedLead.phone_number)) {
      setMsg({
        classText: "error",
        text: "מספר טלפון חייב להכיל בדיוק 10 ספרות.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedLead.email)) {
      setMsg({ classText: "error", text: "כתובת האימייל אינה תקינה." });
      return;
    }

    try {
      await axios.post("http://localhost:8801/api/leads/new", cleanedLead);
      setMsg({ classText: "success", text: "הפנייה נוצרה בהצלחה!" });
      setTimeout(() => navigate("/api/leads"), 3000);
    } catch (error) {
      console.error("Error creating lead:", error);
      setMsg({ classText: "error", text: "אירעה שגיאה בעת יצירת הפנייה." });
    }
  };

  return (
    <div className="main">
      <div className="create-lead">
        <h2>פנייה חדשה</h2>
        {msg.text && <p className={msg.classText}>{msg.text}</p>}
        <form onSubmit={handleSubmit}>
          {Object.keys(newLead).map((key) => (
            <div key={key}>
              <label>{key.replace("_", " ")} :</label>
              <input
                type={key === "email" ? "email" : "text"}
                name={key}
                value={newLead[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">יצירת פנייה</button>
        </form>
      </div>
    </div>
  );
}

export default CreateLead;
