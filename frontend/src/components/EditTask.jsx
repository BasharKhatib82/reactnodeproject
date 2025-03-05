
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedTask, setEditedTask] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch lead data
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    axios
      .get(`http://localhost:8801/api/tasks/${id}`)
      .then((res) => {
        setEditedTask(res.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lead:", error);
        setError("אירעה שגיאה בטעינת נתוני המשימה.");
        setLoading(false);
      });
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
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
      title: cleanString(editedTask.title),
      content: cleanString(editedTask.content),
      deadline: cleanString(editedTask.deadline)
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

    // Update task
    updatedTask(cleanedTask);
  };

  // Update lead in the database
  const updatedTask = (taskToSend) => {
    axios
      .put(`http://localhost:8801/api/tasks/update/${id}`, taskToSend)
      .then((res) => {
        console.log("Task updated:", res.data);
        setMsg("המשימה עודכנה בהצלחה.");
        setTimeout(() => {
            // ניווט חזרה לדף משימות
          navigate("/api/tasks");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        setError("אירעה שגיאה בעדכון המשימה.");
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
      <h2>עדכון משימה</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>נושא משימה :</label>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>תוכן המשימה :</label>
          <input
            type="text"
            name="content"
            value={editedTask.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>תאריך יעד :</label>
          <input
            type="text"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">עדכן</button>
      </form>
    </div>
  );
}

export default EditTask;