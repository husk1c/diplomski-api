const jwt = require("jsonwebtoken");
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
    if (error) {
      return false;
    }
    return decoded;
  });
}

module.exports = verifyToken;
