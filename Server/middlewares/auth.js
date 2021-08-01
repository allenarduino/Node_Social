const jwt = require("jsonwebtoken");
const secret = require("../secret");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.body.token;

  if (!token) {
    return res.status(403).send("Token required");
  }
  try {
    const decoded = jwt.verify(token, secret.secret_key);
    req.user_id = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
