// import React from 'react';
import React,{useEffect,useState} from 'react';
import { useParams  } from 'react-router-dom';
import axios from 'axios';

function SingleTask() {
    const [task , setTask] = useState({});
    
    const{id} = useParams();
    
    useEffect(()=> {
      fetchData();
    },[]);
    
    const fetchData = () => {
      axios.get(`http://localhost:8801/api/tasks/${id}`)
      .then(res=> {
        setTask(res.data[0]);
        console.log(res.data[0]);  // task by id from table tasks
      })
      .catch(error => {
        console.error('Erroe:', error);
      } );
    };
     
       
       return (
        <section className="main">
          {task ? (
            <div className="container">
              <div className ="task">
              <p className="title">נושא משימה : {task.title}</p>
                <p className="content">תוכן המשימה : {task.content}</p>
                <p className="deadline">תאריך יעד : {task.deadline}</p>
              
          </div>
         
          </div>
    
          ):(
          <div className="container">
            
            <p> לא נמצאה משימהה!</p>  
          </div>
        )}  
         
        </section>
      );
    }
export default SingleTask;