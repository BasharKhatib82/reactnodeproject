
// Bashar Khatib    ID : 066043167
// Tareq Shaltaf    ID : 315483032


const express = require('express');
const session = require("express-session");
const cors = require('cors');
const app = express();

const loginRoutes = require("./routes/log_in_out");
const leadsRoutes = require("./routes/leads");
const usersRoutes = require("./routes/users");
const tasksRoutes = require("./routes/tasks");



app.use(cors());

const port = process.env.PORT || 8801;


app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // Session תקף לשעה
  })
);


app.use(express.json())
app.use("/local",express.static('local'));
app.use("/log", loginRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

// טיפול בשגיאות
app.use((err, req, res, next) => {
  console.error(err); // Log error
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
