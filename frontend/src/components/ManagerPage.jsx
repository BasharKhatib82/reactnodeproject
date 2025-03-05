import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ManagerPage() {
  const [employees, setEmployees] = useState([]);
  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // שימוש לניווט אחרי התנתקות

  useEffect(() => {
    fetchDataEmployees();
    fetchDataLeads();
    fetchDataTasks();
  }, []);

  const fetchDataEmployees = () => {
    axios
      .get("http://localhost:8801/api/users")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const fetchDataLeads = () => {
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
        navigate("/"); // מעבר לדף ההתחברות לאחר ההתנתקות
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
         <h1>רשימת עובדים</h1>
      </div>

      
        <Link to={`/api/users/new`} className="view-button-employee">
          עובד חדש
        </Link>
        <div className="users-list">
          {employees.map((employee) => (
            <div key={employee.employee_id} className="user">
              <p className="first_name">שם פרטי : {employee.first_name}</p>
              <p className="last_name">שם משפחה : {employee.last_name}</p>
              <p className="phone_number">מספר טלפון : {employee.phone_number}</p>
              <div className="btn-view-edit">
                <Link to={`/api/users/${employee.employee_id}`} className="view-button">
                  פרטי עובד
                </Link>
                <Link to={`/api/users/update/${employee.employee_id}`} className="edit-button">
                  ערוך פרטים
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1>רשימת פניות</h1>
      <div className="container">
        <div className="buttons-top-main-page">
          <Link to={`/api/leads/new`} className="view-button-new-lead">
            פנייה חדשה
          </Link>
        </div>
        <div className="leads-list">
          {leads.map((lead) => (
            <div key={lead.lead_id} className="lead">
              <p className="first_name">שם פרטי : {lead.first_name}</p>
              <p className="last_name">שם משפחה : {lead.last_name}</p>
              <p className="phone_number">טלפון : {lead.phone_number}</p>
              <p className="email">דואר אלקטרוני : {lead.email}</p>
              <p className="status">סטטוס : {lead.status}</p>
              <div className="btn-view-edit">
                <Link to={`/api/leadsA/${lead.lead_id}`} className="view-button">
                  הצג פנייה
                </Link>
                <Link to={`/api/leads/update/${lead.lead_id}`} className="edit-button">
                  ערוך פנייה
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
      <hr className="about__divider" />
      </div>
      <h1>רשימת משימות</h1>
      <div className="container">
        <Link to={`/api/tasks/new`} className="view-button-task">
          משימה חדשה
        </Link>
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.task_id} className="task">
              <p className="title">נושא משימה : {task.title}</p>
              <p className="content">תוכן המשימה : {task.content}</p>
              <div>
                <label>תאריך יעד :</label>
                <span>{new Date(task.deadline).toLocaleDateString("he-IL")}</span>
              </div>
              <div className="btn-view-edit">
                <Link to={`/api/tasksA/${task.task_id}`} className="view-button">
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

export default ManagerPage;
