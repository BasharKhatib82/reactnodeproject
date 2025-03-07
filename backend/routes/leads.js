const express = require("express");
const router = express.Router();
const dbSingleton = require("../modules/dbSingleton");

router.use(express.json());
const database = dbSingleton.getConnection();

// קבלת כל הפניות
router.get("/", (req, res) => {
  database.query("SELECT * FROM leads", (error, results) => {
    if (error) return res.status(500).json(error);
    res.json(results);
  });
});

// קבלת פנייה לפי מזהה
router.get("/:id", (req, res) => {
  const leadId = req.params.id;
  database.query(
    "SELECT * FROM leads WHERE lead_id = ?",
    [leadId],
    (error, results) => {
      if (error)
        return res.status(500).json({ error: "אירעה שגיאה במסד הנתונים." });
      if (!results.length)
        return res.status(404).json({ error: "הפנייה לא נמצאה." });
      res.json(results[0]);
    }
  );
});

// הוספת פנייה חדשה
router.post("/new", (req, res) => {
  const {
    first_name,
    last_name,
    phone_number,
    email,
    course_name,
    city,
    status,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !phone_number ||
    !email ||
    !course_name ||
    !city ||
    !status
  ) {
    return res.status(400).json({ error: "יש למלא את כל השדות החובה." });
  }

  const querySql = "INSERT INTO leads SET ?";
  const values = {
    first_name,
    last_name,
    phone_number,
    email,
    course_name,
    city,
    status,
  };

  database.query(querySql, values, (error, results) => {
    if (error) return res.status(500).json(error);
    res.json({ message: "הפנייה נוצרה בהצלחה", id: results.insertId });
  });
});

// עדכון פרטי פנייה
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    phone_number,
    email,
    course_name,
    city,
    status,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !phone_number ||
    !email ||
    !course_name ||
    !city ||
    !status
  ) {
    return res.status(400).json({ error: "יש למלא את כל השדות החובה." });
  }

  const query =
    "UPDATE leads SET first_name = ?, last_name = ?, phone_number = ?, email = ?, course_name = ?, city = ?, status = ? WHERE lead_id = ?";
  database.query(
    query,
    [first_name, last_name, phone_number, email, course_name, city, status, id],
    (error, results) => {
      if (error) return res.status(500).json(error);
      if (!results.affectedRows)
        return res.status(404).json({ error: "הפנייה לא נמצאה." });
      res.json({ message: "פרטי הפנייה עודכנו בהצלחה" });
    }
  );
});

// מחיקת פנייה לפי מזהה
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  database.query(
    "DELETE FROM leads WHERE lead_id = ?",
    [id],
    (error, results) => {
      if (error) return res.status(500).json(error);
      if (!results.affectedRows)
        return res.status(404).json({ error: "הפנייה לא נמצאה." });
      res.json({ message: "הפנייה נמחקה בהצלחה" });
    }
  );
});

module.exports = router;
