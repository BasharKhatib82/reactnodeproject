import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/EditLead.css";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedUser, setEditedUser] = useState(null);
  const [msg, setMsg] = useState({ classText: "", text: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8801/api/users/${id}`)
      .then((res) => {
        setEditedUser(res.data[0]);
        setLoading(false);
      })
      .catch(() => {
        setMsg({ classText: "error", text: "אירעה שגיאה בטעינת נתוני העובד." });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const cleanString = (str) =>
    typeof str === "string" ? str.trim().replace(/\s+/g, " ") : str;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedUser) return;

    const cleanedUser = {
      employee_id: cleanString(editedUser.employee_id),
      first_name: cleanString(editedUser.first_name),
      last_name: cleanString(editedUser.last_name),
      age: parseInt(editedUser.age, 10),
      phone_number: cleanString(editedUser.phone_number),
      email: cleanString(editedUser.email),
      role: cleanString(editedUser.role),
      username: cleanString(editedUser.username),
      password: editedUser.password ? cleanString(editedUser.password) : null,
    };

    if (
      Object.values(cleanedUser).some((value) => value === "" || value === null)
    ) {
      setMsg({ classText: "error", text: "יש למלא את כל השדות החובה." });
      return;
    }

    if (!/^\d{9}$/.test(cleanedUser.employee_id)) {
      setMsg({
        classText: "error",
        text: "תעודת זהות חייבת להכיל בדיוק 9 ספרות.",
      });
      return;
    }

    if (isNaN(cleanedUser.age) || cleanedUser.age < 18) {
      setMsg({ classText: "error", text: "ההרשמה מותרת לעובדים מעל גיל 18." });
      return;
    }

    if (!/^\d{10}$/.test(cleanedUser.phone_number)) {
      setMsg({
        classText: "error",
        text: "מספר טלפון חייב להכיל בדיוק 10 ספרות.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedUser.email)) {
      setMsg({ classText: "error", text: "כתובת האימייל אינה תקינה." });
      return;
    }

    axios
      .put(`http://localhost:8801/api/users/update/${id}`, cleanedUser)
      .then(() => {
        setMsg({ classText: "success", text: "פרטי העובד עודכנו בהצלחה." });
        setTimeout(() => navigate("/api/users"), 3000);
      })
      .catch(() => {
        setMsg({ classText: "error", text: "אירעה שגיאה בעדכון פרטי העובד." });
      });
  };

  if (loading) return <div className="loading">טוען נתונים...</div>;
  return (
    <div className="main">
      <h2>עדכון פרטי עובד</h2>
      {msg.text && <p className={msg.classText}>{msg.text}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(editedUser).map((key) => (
          <div key={key}>
            <label>{key.replace("_", " ")} :</label>
            <input
              type={
                key === "password"
                  ? "password"
                  : key === "age"
                  ? "number"
                  : "text"
              }
              name={key}
              value={editedUser[key]}
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

export default EditUser;
