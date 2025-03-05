import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteModal from "./DeleteModal"; // ייבוא המודאל

function SingleLeadAdmin() {
  const [lead, setLead] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // מצב להצגת המודאל
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:8801/api/leads/${id}`)
      .then((res) => {
        setLead(res.data);
      })
      .catch((error) => {
        console.error("Error fetching lead:", error);
      });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8801/api/leads/delete/${id}`);
      console.log(`הפנייה של ${lead.first_name} ${lead.last_name} נמחקה`);
      setIsModalOpen(false); // סגירת המודאל לאחר מחיקה
      navigate("/api/leads"); // חזרה לדף הפניות
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  return (
    <section className="main">
      {lead ? (
        <div className="container">
          <div className="lead">
            <p className="first_name">שם פרטי: {lead.first_name}</p>
            <p className="last_name">שם משפחה: {lead.last_name}</p>
            <p className="phone_number">טלפון: {lead.phone_number}</p>
            <p className="email">דואר אלקטרוני: {lead.email}</p>
            <p className="course_name">שם קורס: {lead.course_name}</p>
            <p className="city">עיר: {lead.city}</p>
            <p className="status">סטטוס: {lead.status}</p>
            <button 
              className="deleteLeadBtn" 
              onClick={() => setIsModalOpen(true)}
            >
              מחיקת פנייה
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <p>לא נמצאה פנייה!</p>
        </div>
      )}

      {/* ✅ הצגת המודאל אם המשתמש לחץ על "מחיקה" */}
      <DeleteModal 
        isOpen={isModalOpen} 
        lead={lead} 
        onConfirm={handleDelete} 
        onCancel={() => setIsModalOpen(false)} 
      />
    </section>
  );
}

export default SingleLeadAdmin;
