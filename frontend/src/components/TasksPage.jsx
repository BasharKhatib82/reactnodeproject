import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8801/api/tasks")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data[0]); // Data from API
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="main">
      
        <div className="container">
          

      <Link to={`/api/tasks/new`} className="view-button-task">
        משימה חדשה
      </Link>
        <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.task_id} className="task">
            <p className="title">נושא משימה : {task.title}</p>
            <p className="content">תוכן המשימה : {task.content}</p>
            <p className="deadline">תאריך יעד : {task.deadline}</p>
              <div className="btn-view-edit">
              <Link
                to={`/api/tasks/${task.task_id}`}
                className="view-button"
              >
              פרטי משימה
              </Link>
              <Link
                to={`/api/tasks/update/${task.task_id}`}
                className="edit-button"
              >טיפול במשימה</Link>
            </div>
          </div>
        ))}
      </div>
      </div>

    </div>
  );
}

export default TasksPage;
