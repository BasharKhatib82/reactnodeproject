import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function CreateTask() {
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
    deadline: "",
  });

  const [msg, setMsg] = useState({ style: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const cleanString = (str) => {
    return str.trim().replace(/\s+/g, " ");
  };
  
  // Handle form submission
  const handleSubmit =  (e) => {
    e.preventDefault();
    const cleanedTask = {
      title: cleanString(newTask.title),
      content: cleanString(newTask.content),
      deadline: cleanString(newTask.deadline)
    };

    if (
      !cleanedTask.title ||
      !cleanedTask.content ||
      !cleanedTask.deadline
    ) {
      setMsg({
        classText: "error",
        text: "Please fill in all the required fields.",
      });
      return;
    }

    if (!cleanedTask.content.length > 0 ) {
      setMsg({
        classText: "error",
        text: "The task must consume content.",
      });
      return;
    }
    try {
      // שליחת נתונים לשרת
      const response =  axios.post("http://localhost:8801/api/tasks/new", cleanedTask);
  
      // אם הבקשה הצליחה
      setMsg({
        classText: "success",
        text: "המשימה נוצרה בהצלחה!",
      });
  
     
         // ניווט חזרה לדף משימות
         setTimeout(() => {
            navigate("/api/tasks");
          }, 3000);
    } catch (error) {
      // טיפול בשגיאות
      console.error("Error creating task:", error);
      setMsg({
        classText: "error",
        text: "אירעה שגיאה בעת יצירת המשימה.",
      });
    }

  };

  return (
    <div className="main">
      <div className="create-lead">
        <h2>משימה חדשה</h2>
        {msg.text && <p className={msg.classText}>{msg.text}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>נושא משימה :</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>תוכן המשימה :</label>
            <input
              type="text"
              name="content"
              value={newTask.content}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>תאריך יעד :</label>
            <input
              type="text"
              name="deadline"
              value={newTask.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">יצירת פנייה</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
