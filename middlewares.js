const jwt = require("jsonwebtoken");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

function auth(req, res, next) {
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    if (!token) return res.status(401).json({ message: "No authorization" });

    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "No authorization" });
  }
}

module.exports = {
  notFound,
  errorHandler,
  auth,
};
