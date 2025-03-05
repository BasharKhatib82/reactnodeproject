import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteModal from "./DeleteModal"; // ייבוא המודאל

function SingleUser() {
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // מצב להצגת המודאל
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:8801/api/users/${id}`)
      .then((res) => {
        setUser(res.data[0]); // קבלת נתוני המשתמש
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8801/api/users/delete/${id}`);
      console.log(`העובד "${user.first_name} ${user.last_name}" נמחק`);
      setIsModalOpen(false); // סגירת המודאל לאחר מחיקה
      navigate("/api/users"); // חזרה לדף העובדים
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section className="main">
      {user ? (
        <div className="container">
          <div className="user">
            <p className="employee_id">תעודת זהות: {user.employee_id}</p>
            <p className="first_name">שם פרטי: {user.first_name}</p>
            <p className="last_name">שם משפחה: {user.last_name}</p>
            <p className="age">גיל: {user.age}</p>
            <p className="phone_number">מספר טלפון: {user.phone_number}</p>
            <p className="email">דואר אלקטרוני: {user.email}</p>
            <p className="role">תפקיד: {user.role}</p>
            <p className="username">שם משתמש: {user.username}</p>
            
            <button 
              className="deleteUserBtn" 
              onClick={() => setIsModalOpen(true)}
            >
              מחיקת עובד
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <p>עובד לא נמצא!</p>
        </div>
      )}

      {/* ✅ הצגת המודאל אם המשתמש לחץ על "מחיקה" */}
      <DeleteModal 
        isOpen={isModalOpen} 
        user={user} 
        onConfirm={handleDelete} 
        onCancel={() => setIsModalOpen(false)} 
      />
    </section>
  );
}

export default SingleUser;
