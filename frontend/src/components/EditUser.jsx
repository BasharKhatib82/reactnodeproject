import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/EditLead.css";

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [editedUser, setEditedUser] = useState(null);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);
  
    // Fetch lead data
    useEffect(() => {
      fetchData();
    }, [id]);
  
    const fetchData = () => {
      axios
        .get(`http://localhost:8801/api/users/${id}`)
        .then((res) => {
        setEditedUser(res.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching lead:", error);
          setError("אירעה שגיאה בטעינת נתוני העובד.");
          setLoading(false);
        });
    };
  
    // Handle field changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedUser((prevUser) => ({
        ...prevUser,
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
  
      if (!editedUser) return;
  
      // Clean and validate fields
      const cleanedUser = {
        employee_id: cleanString(editedUser.employee_id),
        first_name: cleanString(editedUser.first_name),
        last_name: cleanString(editedUser.last_name),
        phone_number: cleanString(editedUser.phone_number),
        email: cleanString(editedUser.email),
        role: cleanString(editedUser.role),
        username: cleanString(editedUser.username),
        password: cleanString(editedUser.password),
      };
  
      // Validation
      if (
        !cleanedUser.employee_id ||
        !cleanedUser.first_name ||
        !cleanedUser.last_name ||
        !cleanedUser.phone_number ||
        !cleanedUser.email ||
        !cleanedUser.role ||
        !cleanedUser.username ||
        !cleanedUser.password
      ) {
        setMsg("אנא מלא את כל השדות הנדרשים.");
        return;
      }
  
      if (cleanedUser.employee_id.length !== 9) {
        setMsg("אורך מספר תעודת הזהות חייב להיות 9 ספרות.");
        return;
      }
      if (cleanedUser.phone_number.length !== 10) {
        setMsg("אורך מספרהטלפון חייב להיות 10 ספרות.");
        return;
      }
  
      // Update user
      updatedUser(cleanedUser);
    };
  
    // Update lead in the database
    const updatedUser = (userToSend) => {
      axios
        .put(`http://localhost:8801/api/users/update/${id}`, userToSend)
        .then((res) => {
          console.log("User updated:", res.data);
          setMsg("פרטי העובד עודכנו בהצלחה.");
          setTimeout(() => {
            navigate("/api/users");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          setError("אירעה שגיאה בעדכון פרטי העובד.");
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
      <h2>עדכון פרטי עובד</h2>
      <form onSubmit={handleSubmit}>
      <div>
            <label>תעודת זהות :</label>
            <input
              type="text"
              name="employee_id"
              value={editedUser.employee_id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>שם פרטי :</label>
            <input
              type="text"
              name="first_name"
              value={editedUser.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>שם משפחה :</label>
            <input
              type="text"
              name="last_name"
              value={editedUser.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>מספר טלפון :</label>
            <input
              type="text"
              name="phone_number"
              value={editedUser.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>דואר אלקטרוני :</label>
            <input
              type="text"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>תפקיד :</label>
            <input
              type="text"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>שם משתמש :</label>
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>סיסמה :</label>
            <input
              type="text"
              name="password"
              value={editedUser.password}
              onChange={handleChange}
              required
            />
          </div>
        
       
        <button type="submit">עדכן</button>
      </form>
    </div>
  );
}

export default EditUser;
