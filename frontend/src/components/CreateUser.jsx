import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/CreateLead.css";

function CreateUser() {
  const [newEmployee, setNewEmployee] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    age: "",
    phone_number: "",
    email: "",
    role: "",
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState({ classText: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const cleanString = (str) =>
    typeof str === "string" ? str.trim().replace(/\s+/g, " ") : str;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedEmployee = {
      employee_id: cleanString(newEmployee.employee_id),
      first_name: cleanString(newEmployee.first_name),
      last_name: cleanString(newEmployee.last_name),
      age: parseInt(newEmployee.age, 10),
      phone_number: cleanString(newEmployee.phone_number),
      email: cleanString(newEmployee.email),
      role: cleanString(newEmployee.role),
      username: cleanString(newEmployee.username),
      password: newEmployee.password ? cleanString(newEmployee.password) : null,
    };

    if (
      Object.values(cleanedEmployee).some(
        (value) => value === "" || value === null
      )
    ) {
      setMsg({ classText: "error", text: "יש למלא את כל השדות החובה." });
      return;
    }

    if (!/^\d{9}$/.test(cleanedEmployee.employee_id)) {
      setMsg({
        classText: "error",
        text: "תעודת זהות חייבת להכיל בדיוק 9 ספרות.",
      });
      return;
    }

    if (isNaN(cleanedEmployee.age) || cleanedEmployee.age < 18) {
      setMsg({
        classText: "error",
        text: "ההרשמה מותרת רק לעובדים מעל גיל 18.",
      });
      return;
    }

    if (!/^\d{10}$/.test(cleanedEmployee.phone_number)) {
      setMsg({
        classText: "error",
        text: "מספר טלפון חייב להכיל בדיוק 10 ספרות.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedEmployee.email)) {
      setMsg({ classText: "error", text: "כתובת האימייל אינה תקינה." });
      return;
    }

    try {
      const response = await fetch("http://localhost:8801/api/users/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedEmployee),
      });

      if (!response.ok) {
        setMsg({
          classText: "error",
          text: " אירעה שגיאה ביצירת המשתמש, עובד נמצה ,נסה שוב.",
        });
        return;
      }

      setMsg({ classText: "success", text: "העובד נוצר בהצלחה!" });
      setTimeout(() => navigate("/api/users"), 3000);
    } catch (error) {
      setMsg({
        classText: "error",
        text: error.message || "שגיאה במהלך יצירת המשתמש.",
      });
    }
  };

  return (
    <div className="main">
      <div className="create-lead">
        <h2>יצירת עובד חדש</h2>
        {msg.text && <p className={msg.classText}>{msg.text}</p>}
        <form onSubmit={handleSubmit}>
          {Object.keys(newEmployee).map((key) => (
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
                value={newEmployee[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">יצירת עובד חדש</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
