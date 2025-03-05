import React from "react";
import '../assets/styles/About.css';

function About() {
  return (
 <div className="main">
      <div className="about">
        <h1 className="about__title">אודותינו</h1>
        <p className="about__text">
          מערכת ניהול הלידים שלנו מציעה פתרון חכם ומתקדם לניהול פניות לקוחות,
          מעקב אחרי לידים ושיפור תהליכי מכירה. בעזרת טכנולוגיות מתקדמות וממשק
          ידידותי, תוכלו לקבל שליטה מלאה על תהליכי העבודה ולשפר את הביצועים
          העסקיים.
        </p>
        <p className="about__text">
          הצטרפו אלינו ותיהנו ממערכת שעובדת בשבילכם, חוסכת זמן ומייעלת את תהליך
          ניהול הלקוחות.
        </p>
        <hr className="about__divider" />
        <h2 className="about__subtitle">היתרונות שלנו</h2>
        <ul className="about__list">
          <li>ניהול לידים חכם ומבוסס נתונים</li>
          <li>אינטגרציה מלאה עם פלטפורמות שיווק דיגיטליות</li>
          <li>ממשק משתמש קל ונוח</li>
          <li>מערכת אבטחה מתקדמת לשמירה על פרטיות המידע</li>
          <li>תמיכה ושירות לקוחות מקצועי</li>
        </ul>
        <p className="about__text">
          אנו מחויבים לשיפור מתמיד של המערכת על מנת לספק ללקוחותינו את הכלים
          הטובים ביותר לניהול עסק מצליח.
        </p>
      </div>
    </div>

  );
}

export default About;
