import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/EditLead.css";

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedLead, setEditedLead] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch lead data
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    axios
      .get(`http://localhost:8801/api/leads/${id}`)
      .then((res) => {
        setEditedLead(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lead:", error);
        setError("אירעה שגיאה בטעינת נתוני הפניה.");
        setLoading(false);
      });
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  // Clean string utility
  const cleanString = (str) => {
    return str.trim().replace(/\s+/g, " ");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editedLead) return;

    // Clean and validate fields
    const cleanedLead = {
      first_name: cleanString(editedLead.first_name),
      last_name: cleanString(editedLead.last_name),
      phone_number: cleanString(editedLead.phone_number),
      email: cleanString(editedLead.email),
      course_name: cleanString(editedLead.course_name),
      city: cleanString(editedLead.city),
      status: cleanString(editedLead.status),
    };

    // Validation
    if (
      !cleanedLead.first_name ||
      !cleanedLead.last_name ||
      !cleanedLead.phone_number ||
      !cleanedLead.email ||
      !cleanedLead.course_name ||
      !cleanedLead.city ||
      !cleanedLead.status
    ) {
      setMsg("אנא מלא את כל השדות הנדרשים.");
      return;
    }

    if (cleanedLead.phone_number.length !== 10) {
      setMsg("אורך מספר הטלפון חייב להיות 10 ספרות.");
      return;
    }

    // Update lead
    updatedLead(cleanedLead);
  };

  // Update lead in the database
  const updatedLead = (leadToSend) => {
    axios
      .put(`http://localhost:8801/api/leads/update/${id}`, leadToSend)
      .then((res) => {
        console.log("Lead updated:", res.data);
        setMsg("הפנייה עודכנה בהצלחה.");
        setTimeout(() => {
          navigate("/api/leads");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating lead:", error);
        setError("אירעה שגיאה בעדכון הפניה.");
      });
  };

  // Loading state
  if (loading) {
    return <div className="loading">טוען נתונים...</div>;
  }

  // Error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Success message
  if (msg) {
    return <div className="success-message">{msg}</div>;
  }

  return (
    <div className="main">
      <h2>עדכון פנייה</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם פרטי:</label>
          <input
            type="text"
            name="first_name"
            value={editedLead.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>שם משפחה:</label>
          <input
            type="text"
            name="last_name"
            value={editedLead.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>מספר טלפון:</label>
          <input
            type="text"
            name="phone_number"
            value={editedLead.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>דואר אלקטרוני:</label>
          <input
            type="email"
            name="email"
            value={editedLead.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>שם קורס:</label>
          <input
            type="text"
            name="course_name"
            value={editedLead.course_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>עיר:</label>
          <input
            type="text"
            name="city"
            value={editedLead.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>סטטוס:</label>
          <input
            type="text"
            name="status"
            value={editedLead.status}
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