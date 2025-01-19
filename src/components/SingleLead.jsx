import React from 'react';
import { useLocation } from 'react-router-dom';

function SingleLead() {
  const location = useLocation();
  //get post data from MainPage
  const lead = location.state?.post;
  console.log(lead);
  return (
    <section className="main">
      <div className="container">
        <p className="fullname_d">
          שם מלא : {lead.firstName} {lead.lastName}
        </p>
        <p className="email_d">דואר אלקטרוני : {lead.email}</p>
        <p className="phone_d">מספר טלפון : {lead.phoneNumber}</p>
      </div>
    </section>
  );
}

export default SingleLead;
