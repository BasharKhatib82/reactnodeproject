import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/EditLead.css";

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedLead, setEditedLead] = useState(null);
  const [msg, setMsg] = useState({ classText: "", text: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8801/api/leads/${id}`)
      .then((res) => {
        setEditedLead(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMsg({
          classText: "error",
          text: "אירעה שגיאה בטעינת נתוני הפנייה.",
        });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  const cleanString = (str) =>
    typeof str === "string" ? str.trim().replace(/\s+/g, " ") : str;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedLead = {
      first_name: cleanString(editedLead.first_name),
      last_name: cleanString(editedLead.last_name),
      phone_number: cleanString(editedLead.phone_number),
      email: cleanString(editedLead.email),
      course_name: cleanString(editedLead.course_name),
      city: cleanString(editedLead.city),
      status: cleanString(editedLead.status),
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

    axios
      .put(`http://localhost:8801/api/leads/update/${id}`, cleanedLead)
      .then(() => {
        setMsg({ classText: "success", text: "הפנייה עודכנה בהצלחה." });
        setTimeout(() => navigate("/api/leads"), 3000);
      })
      .catch(() => {
        setMsg({ classText: "error", text: "אירעה שגיאה בעדכון הפנייה." });
      });
  };

  if (loading) return <div className="loading">טוען נתונים...</div>;
  return (
    <div className="main">
      <h2>עדכון פנייה</h2>
      {msg.text && <p className={msg.classText}>{msg.text}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(editedLead).map((key) => (
          <div key={key}>
            <label>{key.replace("_", " ")} :</label>
            <input
              type={key === "email" ? "email" : "text"}
              name={key}
              value={editedLead[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">עדכן</button>
      </form>
    </div>
  );
}

export default EditLead;
