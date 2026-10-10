var jwt = require('jsonwebtoken');

var JWT_SECRET = process.env.JWT_SECRET || 'travlr-secret-key';

// Middleware: require a valid JWT in the Authorization header
// Header format: Authorization: Bearer <token>
module.exports = function authenticateJWT(req, res, next) {
  var authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  var token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};
