const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
      return next();  // If the user is an administrator, move on to the next handler
}
  return res.status(403).send('You do not have permission to perform this operation.');
};

module.exports = isAdmin; // ייצוא המודול לשימוש בקבצים אחרים