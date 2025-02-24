import React from "react";
import { Link } from "react-router-dom";


function MainPage() {
  //  מערך לידים
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
      email: "kuku.nm1@gmail.com",
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
      <Link to={`/new_lead`} className="view-button-new-lead">
        פנייה חדשה
      </Link>
      {/* ----------------------------הצגת רשימת לידים ----------------------------- */}
      <div className="leads-list">
        {leads.map((lead) => (
          <div key={lead.id} className="lead">
            <p className="firstName">שם פרטי : {lead.firstName}</p>
            <p className="lastName">שם משפחה : {lead.lastName}</p>
            <p className="email">דואר אלקטרוני : {lead.email}</p>
            <p className="phoneNumber">מספר טלפון : {lead.phoneNumber}</p>
      {/* ---------------------------------------------------------------------------- */}
            <div className="btn-view-edit">
              <Link
                to={`/post/${lead.id}`}
                state={{ post: lead }}
                className="view-button"
              >
                הצג פנייה
              </Link>
              <Link
                to={`/edit_lead/${lead.id}`}
                state={{ post: lead }}
                className="edit-button"
              >
                ערוך פנייה
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
