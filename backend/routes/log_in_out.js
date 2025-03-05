const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require('express-session')

const dbSingleton = require('../modules/dbSingleton')



router.use(express.json());

// בצע שאילתה למסד הנתונים 
const database = dbSingleton.getConnection();


// קבלת עובד לפי שם משתמש
//---------------------------------------------------------------------------
router.post("/in", (req, res) => {
  const { username, password } = req.body;

  // בדיקה שהשדות קיימים
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  // שליפת המשתמש מבסיס הנתונים לפי שם משתמש
  const query = "SELECT * FROM employees WHERE username = ?";
  database.query(query, [username], async (error, results) => {
    if (error) { return res.status(500).json({ error: "Database error", details: error });
    }

    // בדיקה אם המשתמש קיים
    if (results.length === 0) {
      return res.status(401).json({ error: "המשתמש לא קיים." });
    }

    const user = results[0];

    // השוואת הסיסמה מול ה-Hash
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ error });
      }

      // שמירת פרטי המשתמש ב-Session
      req.session.user = {
        id: user.employee_id,
        username: user.username,
        role: user.role,
      };

      res.json({ success: true, user: req.session.user });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
});

// לצורך שליחת תפקיד למשתמש מחובר 
router.get("/session", (req, res) => {
  if (req.session.user) {
    
    res.send(req.session.user.role); // שולח אובייקט במקום ערך בודד
  }
});



router.get('/out', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
         res.json({ success: true, message: "Logged out successfully." });
    });
});



module.exports = router;