const express = require("express");
const router = express.Router();


const dbSingleton = require('../modules/dbSingleton')
router.use(express.json());

// בצע שאילתה למסד הנתונים 
const database = dbSingleton.getConnection();


// קבלת כל הפניות
//---------------------------------------------------------------------------
router.get("/", (req, res) => {
  const querySql = "SELECT * FROM leads ";
  database.query(querySql, (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(results);
  });
});

// קבלת פניה יחידה על פי id
//---------------------------------------------------------------------------
router.get("/:id", (req, res) => {
  const leadId = req.params.id; // קבלת ה-id מהנתיב
  const querySql = "SELECT * FROM leads WHERE lead_id = ?"; // שאילתה עם תנאי WHERE

  database.query(querySql, [leadId], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).send({ error: "אירעה שגיאה במסד הנתונים." });
      return;
    }

    if (results.length === 0) {
      // אם לא נמצאה רשומה עם ה-id הנתון
      res.status(404).send({ error: "הפניה לא נמצאה." });
      return;
    }

    // החזרת הרשומה הראשונה (קיימת רק אחת כי id הוא ייחודי)
    res.json(results[0]);
  });
});

// הוספת פנייה חדשה
//---------------------------------------------------------------------------
router.post("/new",(req, res) => {
        const querySql =
          "INSERT INTO leads(`first_name`,`last_name`,`phone_number`,`email`,`course_name`,`city`,`status`) VALUES (?)";
        const values = [
          req.body.first_name,
          req.body.last_name,
          req.body.phone_number,
          req.body.email,
          req.body.course_name,
          req.body.city,
          req.body.status, 
        ];

        database.query(querySql, [values], (error, results) => {
          if (error) return res.status(500).json(error);

          res.json({ message: "פנייה נוצרה בהצלחה", id: results.insertId });
        });
      });

//---------------------------------------------------------------------------
// עדכון פרטי פנייה
router.put("/update/:id", (req, res) => {
  const {id} = req.params;
  const {first_name,last_name,phone_number,email,course_name,city,status} = req.body;

  const query = "UPDATE leads SET first_name = ?, last_name = ?, phone_number = ?, email = ?, course_name = ?, city = ?,status = ? WHERE lead_id = ?";

  database.query(query,[first_name, last_name, phone_number, email, course_name , city ,status , id ], (error, results) => {
    if (error) {
      res.status(500).send(error);
    return;
    }
    res.json({ message: "פרטי הפנייה עודכנו בהצלחה" });
  });
});


//---------------------------------------------------------------------------
// מחיקת עבוד לפי מזהה שלו
router.delete("/delete/:id", (req, res) => {
  const {id} = req.params;

  // בדיקה אם הפניה קיימת
  const queryCheck = "SELECT * FROM leads WHERE lead_id = ?";
  database.query(queryCheck, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json(" פנייה לא קיימת");

    // מחיקת פניה אם היא קיימת
    const queryDelete = "DELETE FROM leads WHERE lead_id = ?";
    database.query(queryDelete, [id], (error, results) => {
      if (error) return res.status(500).json(error);


      res.json({ message: "הפנייה נמחקה בהצלחה" });
    });
  });
});




module.exports = router;