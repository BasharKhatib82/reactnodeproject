const express = require("express");
const router = express.Router();

const dbSingleton = require('../modules/dbSingleton')
router.use(express.json());

// בצע שאילתה למסד הנתונים 
const database = dbSingleton.getConnection();


// קבלת כל המשימות
//---------------------------------------------------------------------------
router.get("/", (req, res) => {
  const querySql = "SELECT * FROM tasks ";
  database.query(querySql, (error, results) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(results);
  });
});

// הוספת פנייה חדשה
//---------------------------------------------------------------------------
router.post("/new", (req, res) => {
        const querySql =
          "INSERT INTO tasks(`title`,`content`,`deadline`) VALUES (?)";
        const values = [
          req.body.title,
          req.body.content,
          req.body.deadline,
        ];

        database.query(querySql, [values], (error, results) => {
          if (error) return res.status(500).json(error);

          res.json({ message: "משימה נוצרה בהצלחה", id: results.insertId });
        });
      });

// קבלת משימה לפי מזהה
//---------------------------------------------------------------------------
router.get("/:id", (req, res) => {
  const taskId = req.params.id; // קבלת ה-id מהנתיב
  const querySql = "SELECT * FROM tasks WHERE task_id = ?"; // שאילתה עם תנאי WHERE

  database.query(querySql, [taskId], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).send({ error: "אירעה שגיאה במסד הנתונים." });
      return;
    }

    if (results.length === 0) {
      // אם לא נמצאה רשומה עם ה-id הנתון
      res.status(404).send({ error: "המשימה לא נמצאה." });
      return;
    }

    // החזרת הרשומה הראשונה (קיימת רק אחת כי id הוא ייחודי)
    res.json(results);
  });
});

//---------------------------------------------------------------------------
// עדכון פרטי פנייה
router.put("/update/:id", (req, res) => {
  const {id} = req.params;
  const {title,content,deadline} = req.body;

  const query = "UPDATE tasks SET  title = ?, content = ?, deadline = ? WHERE task_id = ?";

  database.query(query,[title,content,deadline , id ], (error, results) => {
    if (error) {
      res.status(500).send(error);
    return;
    }
    res.json({ message: "פרטי המשימה עודכנו בהצלחה" });
  });
});


//---------------------------------------------------------------------------
// מחיקת עבוד לפי מזהה שלו
router.delete("/delete/:id", (req, res) => {
  const {id} = req.params;

    // מחיקת העובד אם הוא קיים
    const queryDelete = "DELETE FROM tasks WHERE task_id = ?";
    database.query(queryDelete, [id], (error, results) => {
      if (error) return res.status(500).json(error);


      res.json({ message: "המשימה נמחקה בהצלחה" });
    });
  });





module.exports = router;