const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // JWT token stored in cookies

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info from token to req.user
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    req.user = null; // Clear req.user if token verification fails
    res.clearCookie('token'); // Clear invalid token
    next();
  }
};

module.exports = authMiddleware;
