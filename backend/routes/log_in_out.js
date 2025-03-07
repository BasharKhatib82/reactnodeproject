const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const dbSingleton = require("../modules/dbSingleton");

router.use(express.json());
const database = dbSingleton.getConnection();

// התחברות משתמש
router.post("/in", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  database.query(
    "SELECT * FROM employees WHERE username = ?",
    [username],
    async (error, results) => {
      if (error)
        return res
          .status(500)
          .json({ error: "Database error", details: error });
      if (!results.length)
        return res.status(401).json({ error: "המשתמש לא קיים." });

      const user = results[0];
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "סיסמה שגויה." });

        req.session.user = {
          id: user.employee_id,
          username: user.username,
          role: user.role,
        };
        res.json({ success: true, user: req.session.user });
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
    }
  );
});

// שליפת תפקיד המשתמש המחובר
router.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({ role: req.session.user.role });
  } else {
    res.status(401).json({ error: "No active session." });
  }
});

// התנתקות משתמש
router.get("/out", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ success: true, message: "Logged out successfully." });
  });
});

module.exports = router;
