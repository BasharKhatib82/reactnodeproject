import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/CreateLead.css';

function CreateLead() {
  const [newLead, setNewLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    inquiryType: "",
    preferredContact: "email",
    subscribeNewsletter: false,
  });

  const [msg, setMsg] = useState({ style: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewLead((prevLead) => ({
      ...prevLead,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const cleanString = (str) => {
    return str.trim().replace(/\s+/g, " ");
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedLead = {
      firstName: cleanString(newLead.firstName),
      lastName: cleanString(newLead.lastName),
      email: cleanString(newLead.email),
      phoneNumber: cleanString(newLead.phoneNumber),
      birthDate: newLead.birthDate,
      inquiryType: newLead.inquiryType,
      preferredContact: newLead.preferredContact,
      subscribeNewsletter: newLead.subscribeNewsletter,
    };

    if (!cleanedLead.firstName || !cleanedLead.lastName || !cleanedLead.email || !cleanedLead.phoneNumber) {
      setMsg({
        classText: "error",
        text: "Please fill in all the required fields.",
      });
      return;
    }

    if (cleanedLead.phoneNumber.length !== 10) {
      setMsg({
        classText: "error",
        text: "The Phone Number length must be 10 Numbers",
      });
      return;
    }

    navigate("/");
  };

  return (
    <div className="main">
      <div className="create-lead">
        <h2>פנייה חדשה</h2>
        {msg.text && <p className={msg.classText}>{msg.text}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>שם פרטי :</label>
            <input type="text" name="firstName" value={newLead.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label>שם משפחה :</label>
            <input type="text" name="lastName" value={newLead.lastName} onChange={handleChange} required />
          </div>
          <div>
            <label>דואר אלקטרוני :</label>
            <input type="email" name="email" value={newLead.email} onChange={handleChange} required />
          </div>
          <div>
            <label>מספר טלפון :</label>
            <input type="" name="phoneNumber" value={newLead.phoneNumber} onChange={handleChange} required />
          </div>
          <div>
            <label>תאריך לידה :</label>
            <input type="date" name="birthDate" value={newLead.birthDate} onChange={handleChange} />
          </div>
          <div className='"inquiryT'>
            <label>בחירת קורס :</label>
            <select name="inquiryType" value={newLead.inquiryType} onChange={handleChange}>
              <option value="">בחר קורס</option>
              <option value="support">הנחיית קבוצות</option>
              <option value="sales">מדריך בכיר באומנות</option>
              <option value="general">טיפול בבישול</option>
            </select>
          </div>
          <div>
            <label>אופן יצירת קשר מועדף :</label>
            <div>
              <input type="radio" name="preferredContact" value="email" checked={newLead.preferredContact === "email"} onChange={handleChange} /> דוא"ל
              <input type="radio" name="preferredContact" value="phone" checked={newLead.preferredContact === "phone"} onChange={handleChange} /> טלפון
            </div>
          </div>
          <div>
            <label>
              <input type="checkbox" name="subscribeNewsletter" checked={newLead.subscribeNewsletter} onChange={handleChange} />
              הירשם לקבלת עדכונים במייל
            </label>
          </div>
          <button type="submit">יצירת פנייה</button>
        </form>
      </div>
    </div>
  );
}

export default CreateLead;
