import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/CreateLead.css";

function CreateUser() {
  const [newEmployee, setNewEmployee] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    age:"",
    phone_number: "",
    email: "",
    role: "",
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState({ style: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };
  const cleanString = (str) => {
    return str.trim().replace(/\s+/g, " ");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ניקוי הנתונים
    const cleanedEmployee = {
      employee_id: cleanString(newEmployee.employee_id),
      first_name: cleanString(newEmployee.first_name),
      last_name: cleanString(newEmployee.last_name),
      age: cleanString( parseInt(newEmployee.age, 18)),
      phone_number: cleanString(newEmployee.phone_number),
      email: cleanString(newEmployee.email),
      role: cleanString(newEmployee.role),
      username: cleanString(newEmployee.username),
      password: cleanString(newEmployee.password),
    };
  
    // בדיקת תקינות
    if (
      !cleanedEmployee.employee_id ||
      !cleanedEmployee.first_name ||
      !cleanedEmployee.last_name ||
      !cleanedEmployee.age ||
      !cleanedEmployee.phone_number ||
      !cleanedEmployee.email ||
      !cleanedEmployee.role ||
      !cleanedEmployee.username ||
      !cleanedEmployee.password
    ) {
      setMsg({
        classText: "error",
        text: "Please fill in all the required fields.",
      });
      return;
    }
  
    // בדיקת תקינות תעודת זהות*
    if (!/^\d{9}$/.test(cleanedEmployee.employee_id)) {
    setMsg({
      classText: "error",
      text: "תעודת זהות חייבת להיות בדיוק 9 ספרות.",
      });
    return;
    }

    // בדיקת גיל (מינימום 18)
    if (isNaN(cleanedEmployee.age) || cleanedEmployee.age < 18) {
    setMsg({
      classText: "error",
      text: "ההרשמה מותרת לעובדים מעל גיל 18.",
      });
    return;
    }

    
  // בדיקת מספר טלפון (10 ספרות)
  if (!/^\d{10}$/.test(cleanedEmployee.phone_number)) {
    setMsg({
      classText: "error",
      text: "מספר טלפון חייב להכיל בדיוק 10 ספרות.",
    });
    return;
  }

    if (cleanedEmployee.age < 20) {
      setMsg({
        classText: "error",
        text: "ההרשמה לעובדים מעל גיל 18 ",
      });
      return;
    }

    //  בדיקת תקינות אימייל**
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedEmployee.email)) {
    setMsg({
      classText: "error",
      text: "כתובת אימייל לא תקינה.",
    });
    return;
    }
  
    try {
      // שליחת נתונים לשרת
      const response = await fetch("http://localhost:8801/api/users/new", {
        method: "POST", //  שליחת פרטי עובד 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedEmployee),
      });
  
      if (!response.ok) {
        // אם השרת החזיר שגיאה
setMsg({
        classText: "error",
        text: "The Phone Number length must be 10 Numbers",
      });
      }
        setTimeout(() => {
                // אם הבקשה הצליחה
      setMsg({
        classText: "success",
        text: "העבוד נוצר בהצלחה!",
        }, 3000);
      });
  
      // ניווט לדף אחר לאחר הצלחה
      navigate("/api/users");
    } catch (error) {
      // טיפול בשגיאות
      setMsg({
        classText: "error",
        text: error.message || "An error occurred while creating the user.",
      });
    }
  };
  

  return (
    <div className="main">
      <div className="create-lead">
        <h2>עובד חדש</h2>
        {msg.text && <p className={msg.classText}>{msg.text}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>תעודת זהות :</label>
            <input
              type="text"
              name="employee_id"
              value={newEmployee.employee_id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>שם פרטי :</label>
            <input
              type="text"
              name="first_name"
              value={newEmployee.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>שם משפחה :</label>
            <input
              type="text"
              name="last_name"
              value={newEmployee.last_name}
              onChange={handleChange}
              required
            />
          </div>
               <div>
            <label>גיל :</label>
            <input
              type="number"
              name="age"
              value={newEmployee.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>מספר טלפון :</label>
            <input
              type="text"
              name="phone_number"
              value={newEmployee.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>דואר אלקטרוני :</label>
            <input
              type="text"
              name="email"
              value={newEmployee.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>תפקיד :</label>
            <input
              type="text"
              name="role"
              value={newEmployee.role}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>שם משתמש :</label>
            <input
              type="text"
              name="username"
              value={newEmployee.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>סיסמה :</label>
            <input
              type="password"
              name="password"
              value={newEmployee.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">יצירת עובד חדש</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
