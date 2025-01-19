import React from 'react'
import { Link } from "react-router-dom";

function MainPage() {
  const leads = [
    {
      id: 1,
      firstName: "בשאר",
      lastName: "ח'טיב",
      email: "ba.khatib@gmail.com",
      phoneNumber: "0503000093",
    },
    {
      id: 2,
      firstName: "טארק",
      lastName: "שלטף",
      email: "tareq.nm1@gmail.com",
      phoneNumber: "0545710021",
    },
    {
      id: 3,
      firstName: "אבי",
      lastName: "כהן",
      email: "Dan.nm1@gmail.com",
      phoneNumber: "0503666693",
    },
    {
      id: 4,
      firstName: "אמיר",
      lastName: "חסון",
      email: "kuku.nm1@gmail.com.",
      phoneNumber: "0503099093",
    },
    {
      id: 5,
      firstName: "קאסם",
      lastName: "ח'ליליה",
      email: "Dan.nm1@gmail.com",
      phoneNumber: "0503666693",
    },


  ];
  return (
    <div className="main">
      <h1>רשימת פניות</h1>
      <div className="leads-list">
        {leads &&
          leads.map((lead) => (
            <div key={lead.id} className="lead">
              <p className="fullName">
                שם מלא : {lead.firstName} {lead.lastName}
              </p>
              <p className="email">דואר אלקטרוני : {lead.email}</p>
              <p className="phoneNumber">מספר טלפון : {lead.phoneNumber}</p>
              <Link
                to={`/post/${lead.id}`}
                state={{ post: lead }}
                className="view-button"
              >
                הצג פנייה
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MainPage
