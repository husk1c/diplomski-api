const appError = require("../utils/appError");
const getToken = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

function isLoggedIn(req, res, next) {
  const token = getToken(req);
  const decodedID = verifyToken(token);
  req.userAuth = decodedID.id;
  if (!decodedID) {
    return next(appError("Invalid/expired token, please log back in."));
  }
  next();
}

module.exports = isLoggedIn;
