const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dbSingleton = require("../modules/dbSingleton");

router.use(express.json());

const database = dbSingleton.getConnection();

// קבלת כל העובדים
router.get("/", (req, res) => {
  database.query("SELECT * FROM employees", (error, results) => {
    if (error) return res.status(500).json(error);
    res.json(results);
  });
});

// קבלת עובד לפי מזהה
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  database.query(
    "SELECT * FROM employees WHERE employee_id = ?",
    [userId],
    (error, results) => {
      if (error)
        return res.status(500).json({ error: "אירעה שגיאה במסד הנתונים." });
      if (!results.length)
        return res.status(404).json({ error: "העובד לא נמצא." });
      res.json(results);
    }
  );
});

// הוספת עובד חדש
router.post("/new", (req, res) => {
  database.query(
    "SELECT * FROM employees WHERE employee_id = ?",
    [req.body.employee_id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("העובד כבר קיים");

      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).json(err);

        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
          if (err) return res.status(500).json(err);

          const querySql = "INSERT INTO employees SET ?";
          const values = {
            employee_id: req.body.employee_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            role: req.body.role,
            username: req.body.username,
            password: hashedPassword,
          };

          database.query(querySql, values, (error, results) => {
            if (error) return res.status(500).json(error);
            res.json({ message: "עובד נוצר בהצלחה", id: results.insertId });
          });
        });
      });
    }
  );
});

// עדכון פרטי עובד
// עדכון פרטי עובד
router.put("/update/:id", (req, res) => {
  const employeeId = req.params.id;
  database.query(
    "SELECT * FROM employees WHERE employee_id = ?",
    [employeeId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(404).json("העובד לא קיים");

      if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return res.status(500).json(err);

          bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            if (err) return res.status(500).json(err);
            updateEmployee(employeeId, req.body, hashedPassword, res);
          });
        });
      } else {
        updateEmployee(employeeId, req.body, null, res);
      }
    }
  );
});

function updateEmployee(employeeId, body, hashedPassword, res) {
  const queryUpdate = `UPDATE employees SET first_name = ?, last_name = ?, age = ?, phone_number = ?, email = ?, role = ?, username = ?, last_password_change = NOW() ${
    hashedPassword ? ", password = ?" : ""
  } WHERE employee_id = ?`;
  const values = [
    body.first_name,
    body.last_name,
    parseInt(body.age, 10),
    body.phone_number,
    body.email,
    body.role,
    body.username,
  ];
  if (hashedPassword) values.push(hashedPassword);
  values.push(employeeId);

  database.query(queryUpdate, values, (error, results) => {
    if (error) return res.status(500).json(error);
    if (!results.affectedRows) return res.status(404).json("עדכון נכשל");
    res.json({ message: "פרטי העובד עודכנו בהצלחה" });
  });
}

// מחיקת עובד לפי מזהה
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  database.query(
    "SELECT * FROM employees WHERE employee_id = ?",
    [id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(404).json("העובד לא נמצא");

      database.query(
        "DELETE FROM employees WHERE employee_id = ?",
        [id],
        (error) => {
          if (error) return res.status(500).json(error);
          res.json({ message: "העובד נמחק בהצלחה" });
        }
      );
    }
  );
});

module.exports = router;
