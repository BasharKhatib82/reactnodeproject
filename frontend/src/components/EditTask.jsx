import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedTask, setEditedTask] = useState(null);
  const [msg, setMsg] = useState({ classText: "", text: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8801/api/tasks/${id}`)
      .then((res) => {
        setEditedTask(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMsg({
          classText: "error",
          text: "אירעה שגיאה בטעינת נתוני המשימה.",
        });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const cleanString = (str) =>
    typeof str === "string" ? str.trim().replace(/\s+/g, " ") : str;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedTask = {
      title: cleanString(editedTask.title),
      content: cleanString(editedTask.content),
      deadline: cleanString(editedTask.deadline),
    };

    if (Object.values(cleanedTask).some((value) => value === "")) {
      setMsg({ classText: "error", text: "יש למלא את כל השדות החובה." });
      return;
    }

    axios
      .put(`http://localhost:8801/api/tasks/update/${id}`, cleanedTask)
      .then(() => {
        setMsg({ classText: "success", text: "המשימה עודכנה בהצלחה." });
        setTimeout(() => navigate("/api/tasks"), 3000);
      })
      .catch(() => {
        setMsg({ classText: "error", text: "אירעה שגיאה בעדכון המשימה." });
      });
  };

  if (loading) return <div className="loading">טוען נתונים...</div>;
  return (
    <div className="main">
      <h2>עדכון משימה</h2>
      {msg.text && <p className={msg.classText}>{msg.text}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(editedTask).map((key) => (
          <div key={key}>
            <label>{key.replace("_", " ")} :</label>
            <input
              type="text"
              name={key}
              value={editedTask[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">עדכן</button>
      </form>
    </div>
  );
}

export default EditTask;
