const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dbSingleton = require('../modules/dbSingleton')




router.use(express.json());

// בצע שאילתה למסד הנתונים 
const database = dbSingleton.getConnection();


// קבלת את כל העובדים
//---------------------------------------------------------------------------
router.get("/" ,isAdmin,(req, res) => {
  const querySql = "SELECT * FROM employees ";
  database.query(querySql, (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(results);
  });
});

// קבלת עובד לפי מזהה
//---------------------------------------------------------------------------
router.get("/:id",isAdmin,(req, res) => {
  const userId = req.params.id; // קבלת ה-id מהנתיב
  const querySql = "SELECT * FROM employees WHERE employee_id = ?"; // שאילתה עם תנאי WHERE

  database.query(querySql, [userId], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).send({ error: "אירעה שגיאה במסד הנתונים." });
      return;
    }

    if (results.length === 0) {
      // אם לא נמצאה רשומה עם ה-id הנתון
      res.status(404).send({ error: "העובד לא נמצאה." });
      return;
    }

    // החזרת הרשומה הראשונה (קיימת רק אחת כי id הוא ייחודי)
    res.json(results);
  });
});


// הוספת עובד חדש
//---------------------------------------------------------------------------
router.post("/new" ,(req, res) => {
  // בדיקת קיום עובד קיים
  const queryEmployees = "SELECT * FROM employees WHERE employee_id = ?";
  database.query(queryEmployees, [req.body.employee_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("העובד כבר קיים");

    // אם העובד לא קיים - המשך ביצירתו
    const employeePassword = req.body.password;

    // יצירת Salt והצפנת הסיסמה
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json(err);

      bcrypt.hash(employeePassword, salt, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);

        // הכנסת הנתונים למסד הנתונים לאחר הצפנת הסיסמה
        const querySql =
          "INSERT INTO employees(`employee_id`,`first_name`,`last_name`,`phone_number`,`email`,`role`,`username`,`password`) VALUES (?)";
        const values = [
          req.body.employee_id,
          req.body.first_name,
          req.body.last_name,
          req.body.phone_number,
          req.body.email,
          req.body.role,
          req.body.username,
          hashedPassword, // שימוש בסיסמה המוצפנת
        ];

        database.query(querySql, [values], (error, results) => {
          if (error) return res.status(500).json(error);

          res.json({ message: "עובד נוצר בהצלחה", id: results.insertId });
        });
      });
    });
  });
});
//---------------------------------------------------------------------------
// עדכון פרטי עובד
router.put("/update/:id",isAdmin, (req, res) => {
  const employeeId = req.params.id;

  // בדיקה אם העובד קיים
  const queryCheck = "SELECT * FROM employees WHERE employee_id = ?";
  database.query(queryCheck, [employeeId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json("העובד לא קיים");

    // בודקים האם המשתמש מבקש לעדכן סיסמה
    if (req.body.password) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).json(err);

        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
          if (err) return res.status(500).json(err);

          // עדכון פרטי העובד עם סיסמה חדשה
          updateEmployee(employeeId, req.body, hashedPassword, res);
        });
      });
    } else {
      // עדכון פרטי העובד בלי שינוי סיסמה
      updateEmployee(employeeId, req.body, null, res);
    }
  });
});
// פונקציה לביצוע העדכון במסד הנתונים
function updateEmployee(employeeId, body, hashedPassword, res) {
  const queryUpdate = `
    UPDATE employees 
    SET first_name = ?, last_name = ?, phone_number = ?, email = ?, role = ?, username = ?
    ${hashedPassword ? ", password = ?" : ""} 
    WHERE employee_id = ?`;

  const values = [
    body.first_name,
    body.last_name,
    body.phone_number,
    body.email,
    body.role,
    body.username,
  ];

  if (hashedPassword) {
    values.push(hashedPassword);
  }

  values.push(employeeId);

  database.query(queryUpdate, values, (error, results) => {
    if (error) return res.status(500).json(error);
    if (results.affectedRows === 0) return res.status(404).json("עדכון נכשל");

    res.json({ message: "פרטי העובד עודכנו בהצלחה" });
  });
}


//---------------------------------------------------------------------------
// מחיקת עבוד לפי מזהה שלו
router.delete("/delete/:id",isAdmin,(req, res) => {
  const {id} = req.params;

  // בדיקה אם העובד קיים
  const queryCheck = "SELECT * FROM employees WHERE employee_id = ?";
  database.query(queryCheck, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json("העובד לא נמצא");

    // מחיקת העובד אם הוא קיים
    const queryDelete = "DELETE FROM employees WHERE employee_id = ?";
    database.query(queryDelete, [id], (error, results) => {
      if (error) return res.status(500).json(error);


      res.json({ message: "העובד נמחק בהצלחה" });
    });
  });
});



module.exports = router;


