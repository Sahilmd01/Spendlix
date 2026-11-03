const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "You are not authorized" });
  }

  try {
    // Verify token or allow decoded payload if expired to auto-refresh seamlessly
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        decoded = jwt.decode(token);
        if (decoded?.id) {
          // Auto-issue fresh token in response header so client never gets logged out
          const refreshedToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
            expiresIn: "365d",
          });
          res.setHeader("x-refreshed-token", refreshedToken);
        } else {
          return res.status(401).json({ message: "You are not authorized, token invalid" });
        }
      } else {
        return res.status(401).json({ message: "You are not authorized, token failed" });
      }
    }

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authorized, token failed" });
  }
};
