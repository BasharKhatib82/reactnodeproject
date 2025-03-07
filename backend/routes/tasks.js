const express = require("express");
const router = express.Router();
const dbSingleton = require("../modules/dbSingleton");

router.use(express.json());
const database = dbSingleton.getConnection();

// קבלת כל המשימות
router.get("/", (req, res) => {
  database.query("SELECT * FROM tasks", (error, results) => {
    if (error) return res.status(500).json(error);
    res.json(results);
  });
});

// הוספת משימה חדשה
router.post("/new", (req, res) => {
  const { title, content, deadline } = req.body;
  if (!title || !content || !deadline) {
    return res.status(400).json({ error: "יש למלא את כל השדות החובה." });
  }

  const querySql = "INSERT INTO tasks SET ?";
  const values = { title, content, deadline };

  database.query(querySql, values, (error, results) => {
    if (error) return res.status(500).json(error);
    res.json({ message: "משימה נוצרה בהצלחה", id: results.insertId });
  });
});

// קבלת משימה לפי מזהה
router.get("/:id", (req, res) => {
  const taskId = req.params.id;
  database.query(
    "SELECT * FROM tasks WHERE task_id = ?",
    [taskId],
    (error, results) => {
      if (error)
        return res.status(500).json({ error: "אירעה שגיאה במסד הנתונים." });
      if (!results.length)
        return res.status(404).json({ error: "המשימה לא נמצאה." });
      res.json(results[0]);
    }
  );
});

// עדכון פרטי משימה
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, deadline } = req.body;
  if (!title || !content || !deadline) {
    return res.status(400).json({ error: "יש למלא את כל השדות החובה." });
  }

  const query =
    "UPDATE tasks SET title = ?, content = ?, deadline = ? WHERE task_id = ?";
  database.query(query, [title, content, deadline, id], (error, results) => {
    if (error) return res.status(500).json(error);
    if (!results.affectedRows)
      return res.status(404).json({ error: "המשימה לא נמצאה." });
    res.json({ message: "פרטי המשימה עודכנו בהצלחה" });
  });
});

// מחיקת משימה לפי מזהה
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  database.query(
    "DELETE FROM tasks WHERE task_id = ?",
    [id],
    (error, results) => {
      if (error) return res.status(500).json(error);
      if (!results.affectedRows)
        return res.status(404).json({ error: "המשימה לא נמצאה." });
      res.json({ message: "המשימה נמחקה בהצלחה" });
    }
  );
});

module.exports = router;
