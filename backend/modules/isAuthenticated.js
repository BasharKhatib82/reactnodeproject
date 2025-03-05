const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next(); // User is authorized, continue
    } else {
        res.status(401).send('Authorization required.');
    }
};

module.exports = isAuthenticated; // ייצוא המודול לשימוש בקבצים אחרים