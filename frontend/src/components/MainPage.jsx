import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/MainPage.css";

function MainPage() {
  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchDataTasks();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8801/api/leads")
      .then((res) => {
        setLeads(res.data);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  };

  const fetchDataTasks = () => {
    axios
      .get("http://localhost:8801/api/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  // פונקציה להתנתקות
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8801/log/out");

      if (response.data.success) {
        console.log("Logged out successfully");
        navigate("/"); // ניתוב לדף ההתחברות לאחר התנתקות
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="logout-button">
          {/*  כפתור התנתקות בראש הדף */}
          <button onClick={handleLogout} className="logout-button">
             התנתקות מהחשבון
          </button>
        </div>
<h1>רשימת פניות</h1>
        {/* הצגת רשימת לידים */}
        <div className="leads-list">
          {leads.map((lead) => (
            <div key={lead.lead_id} className="lead">
              <p className="first_name">שם פרטי : {lead.first_name}</p>
              <p className="last_name">שם משפחה : {lead.last_name}</p>
              <p className="phone_number">טלפון : {lead.phone_number}</p>
              <p className="email">דואר אלקטרוני : {lead.email}</p>
              <p className="status">סטטוס : {lead.status}</p>
              <div className="btn-view-edit">
                <Link to={`/api/leads/${lead.lead_id}`} className="view-button">
                  הצג פנייה
                </Link>
              </div>
            </div>
          ))}
        </div>
        <hr />
        <h1>רשימת משימות</h1>
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.task_id} className="task">
              <p className="title">נושא משימה : {task.title}</p>
              <p className="content">תוכן המשימה : {task.content}</p>
              <p className="deadline">תאריך יעד : {new Date(task.deadline).toLocaleDateString("he-IL")}</p>
              <div className="btn-view-edit">
                <Link to={`/api/tasks/${task.task_id}`} className="view-button">
                  פרטי משימה
                </Link>
                <Link to={`/api/tasks/update/${task.task_id}`} className="edit-button">
                  טיפול במשימה
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
