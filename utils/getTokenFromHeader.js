function getToken(req) {
  const headerObj = req.headers;
  const token = headerObj["authorization"].split(" ")[1];
  if (!token) {
    return false;
  }
  return token;
}

module.exports = getToken;
