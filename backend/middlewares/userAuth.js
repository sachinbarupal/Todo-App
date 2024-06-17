const jwt = require("jsonwebtoken");
function userAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ msg: "Invalid Token" });

    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedValue.username)
      return res.status(403).json({ msg: "Invalid Token" });

    req.username = decodedValue.username;
    next();
  } catch (err) {
    console.log("Error in Authorization", err);
    res.status(403).json({ msg: "Error in Authorization" });
  }
}

module.exports = userAuth;
