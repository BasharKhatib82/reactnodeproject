const isAdmin = (req, res, next) => {
  console.log("Checking admin:", req.session.user); // בדיקה אם יש מידע ב-Session

  if (req.session.user && req.session.user.role === "admin") {
    console.log("User is admin");
    return next();
  }

  console.log("User does not have admin rights");
  return res
    .status(403)
    .json({ error: "You do not have permission to perform this operation." });
};

module.exports = isAdmin;
