import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteModal from "./DeleteModal"; // ייבוא המודאל

function SingleTask() {
  const [task, setTask] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // מצב להצגת המודאל
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:8801/api/tasks/${id}`)
      .then((res) => {
        setTask(res.data[0]); // קבלת נתוני המשימה
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8801/api/tasks/delete/${id}`);
      console.log(`המשימה "${task.title}" נמחקה`);
      setIsModalOpen(false); // סגירת המודאל לאחר מחיקה
      navigate("/api/tasks"); // חזרה לדף המשימות
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <section className="main">
      {task ? (
        <div className="container">
          <div className="task">
            <p className="title">נושא משימה: {task.title}</p>
            <p className="content">תוכן המשימה: {task.content}</p>
            <p className="deadline">תאריך יעד: {task.deadline}</p>
            <button 
              className="deleteLeadBtn" 
              onClick={() => setIsModalOpen(true)}
            >
              מחיקת משימה
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <p>לא נמצאה משימה!</p>
        </div>
      )}

      {/* ✅ הצגת המודאל אם המשתמש לחץ על "מחיקה" */}
      <DeleteModal 
        isOpen={isModalOpen} 
        task={task} 
        onConfirm={handleDelete} 
        onCancel={() => setIsModalOpen(false)} 
      />
    </section>
  );
}

export default SingleTask;
