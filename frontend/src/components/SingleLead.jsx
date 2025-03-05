
import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleLead() {
const [lead , setLead] = useState({});
const{id} = useParams();

useEffect(()=> {
  fetchData();
},[]);

const fetchData = () => {
  axios.get(`http://localhost:8801/api/leads/${id}`)
  .then(res=> {
    setLead(res.data);
    console.log(res.data);  // lead by id from table leads
  })
  .catch(error => {
    console.error('Erroe:', error);
  } );
};
 
   return (
    <section className="main">
      {lead ? (
        <div className="container">
          <div className ="lead">
          <p className="first_name">שם פרטי : {lead.first_name}</p>
            <p className="last_name">שם משפחה : {lead.last_name}</p>
            <p className="phone_number">טלפון : {lead.phone_number}</p>
            <p className="email">דואר אלקטרוני : {lead.email}</p>
            <p className="course_name">שם קורס : {lead.course_name}</p>
            <p className="city">עיר : {lead.city}</p>
            <p className="status">סטטוס : {lead.status}</p>
           
      </div>
     
      </div>

      ):(
      <div className="container">
        
        <p> לא נמצאה פנייה!</p>  
      </div>
    )}  
     
    </section>
  );
}

export default SingleLead;