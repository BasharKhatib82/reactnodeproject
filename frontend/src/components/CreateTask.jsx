import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
    deadline: "",
  });

  const [msg, setMsg] = useState({ classText: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const cleanString = (str) =>
    typeof str === "string" ? str.trim().replace(/\s+/g, " ") : str;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedTask = {
      title: cleanString(newTask.title),
      content: cleanString(newTask.content),
      deadline: cleanString(newTask.deadline),
    };

    if (Object.values(cleanedTask).some((value) => value === "")) {
      setMsg({ classText: "error", text: "יש למלא את כל השדות החובה." });
      return;
    }

    if (cleanedTask.content.length === 0) {
      setMsg({ classText: "error", text: "על המשימה לכלול תוכן." });
      return;
    }

    try {
      await axios.post("http://localhost:8801/api/tasks/new", cleanedTask);
      setMsg({ classText: "success", text: "המשימה נוצרה בהצלחה!" });
      setTimeout(() => navigate("/api/tasks"), 3000);
    } catch (error) {
      console.error("Error creating task:", error);
      setMsg({ classText: "error", text: "אירעה שגיאה בעת יצירת המשימה." });
    }
  };

  return (
    <div className="main">
      <div className="create-lead">
        <h2>משימה חדשה</h2>
        {msg.text && <p className={msg.classText}>{msg.text}</p>}
        <form onSubmit={handleSubmit}>
          {Object.keys(newTask).map((key) => (
            <div key={key}>
              <label>{key.replace("_", " ")} :</label>
              <input
                type="text"
                name={key}
                value={newTask[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">יצירת פנייה</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
