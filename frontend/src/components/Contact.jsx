import React from "react";
import "../assets/styles/Contact.css"

function Contact() {
  return (
    <div className="container">
    <div className="contact-container">
      <h2>📞 צרו איתנו קשר</h2>
      <p>
        אנו כאן בשבילכם! נשמח לספק מידע, לתת מענה לשאלות ולעזור בכל נושא.
        אל תהססו לפנות אלינו ונעשה כל שביכולתנו לסייע לכם.
      </p>

      <div className="contact-details">
        <h3>📍  פרטי יצירת קשר  </h3>
        <p>🏢 כתובת: בית הספר להנדסאים, חיפה</p>
        <p>📞  טלפון:  <a href="tel:+972500000000">050-3000093</a></p>
                <p>📞  טלפון:  <a href="tel:+972500000000">054-5710021</a></p>
        <p>📧  אימייל:  <a href="mailto:info@example.com">ba.khatib.82@gmail.com</a></p>
      </div>


      <div className="service-commitment">
        <h3>💡 **מה אנחנו מציעים?**</h3>
        <ul>
          <li>✔️ מענה מהיר ומקצועי לכל שאלה.</li>
          <li>✔️ שירות אישי ומותאם לכל לקוח.</li>
          <li>✔️ פתרון בעיות בצורה היעילה ביותר.</li>
          <li>✔️ תמיכה טכנית ומענה אדיב לכל בקשה.</li>
        </ul>
      </div>

      <div className="social-links">
        <h3>📱 **עקבו אחרינו ברשתות החברתיות**</h3>
        <p>הישארו מעודכנים וקבלו עדכונים על מבצעים, חדשות והטבות מיוחדות!</p>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> |
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
      </div>

 

  
     </div>
    </div>
  );
}

export default Contact;
