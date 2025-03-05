import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "../assets/styles/HomePage.css";



function HomePage() {
  const [isLogin, setIsLogin] = useState(true); // מצב: כניסה או הרשמה
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    age:"",
    phone_number: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // שינוי מצב בין כניסה להרשמה
  const statusSignUp = () => {
    setIsLogin((prev) => !prev);
    setFormData({
      employee_id: "",
      first_name: "",
      last_name: "",
      age:"",
      phone_number: "",
      email: "",
      username: "",
      password: "",
    }); // איפוס השדות בהתאם למצב
    setError(""); // איפוס הודעת שגיאה
  };

  // עדכון השדות בטופס
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // שליחה לטיפול בשרת
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isLogin) {
      const DbResult = await axios.post("http://localhost:8801/log/in", {
        username: formData.username,
        password: formData.password,
      });

      console.log("Login Response:", DbResult.data); // בדיקה לנתונים מהשרת

      if (DbResult.data) {
        if (DbResult.data.user.role === "admin") {
          navigate("/api/users");
        } else {
          navigate("/api/leads");
        }
      }
    } else {
      const registerResponse = await axios.post("http://localhost:8801/api/users/new", formData);
      console.log("Register Response:", registerResponse.data); // בדיקה לנתונים מהשרת
      
      setIsLogin(true);
      setFormData({
        employee_id: "",
        first_name: "",
        last_name: "",
        age:"",
        phone_number: "",
        email: "",
        username: "",
        password: "",
      });

      setError("");
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message); // הצגת השגיאה המלאה
    setError("שם משתמש או סיסמה שגויים");
  }
};

 return (
    <div className="main">
      <div className="container">
        <div className="container-hom">
          <div className="content-home-page">
            <h1>ברוכים הבאים</h1>
            <p>ברוכים הבאים למערכת שלנו! הירשמו או התחברו כדי להמשיך.</p>
          </div>
          <div className={`auth-container ${isLogin ? "login" : ""}`}>
            <form onSubmit={handleSubmit}>
              <h2>{isLogin ? "כניסה" : "הרשמה"}</h2>
              {error && <p className="error-message">{error}</p>}

              {/* שדות נוספים שיופיעו רק בהרשמה */}
              <div className="register-fields">
                {!isLogin && (
                  <>
                    <div>
                      <label>תעודת זהות:</label>
                      <input
                        type="text"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <label>שם פרטי:</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <label>שם משפחה:</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required={!isLogin}
                      />
                    </div>
                      <div>
                      <label>גיל :</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <label>מספר טלפון:</label>
                      <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <label>אימייל:</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required={!isLogin}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* שם משתמש וסיסמה - תמיד מופיעים */}
              <div>
                <label>שם משתמש:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>סיסמה:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit">{isLogin ? "התחבר" : "הירשם"}</button>

              <p>
                {isLogin ? "אין לך חשבון?" : "כבר יש לך חשבון?"}{" "}
                <button type="button" onClick={statusSignUp} className="statusSignUp">
                  {isLogin ? "הירשם כאן" : "התחבר כאן"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
