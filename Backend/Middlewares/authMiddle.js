const jwt = require("jsonwebtoken");
const User = require("../DB/Modules/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
 console.log("Token received:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password -otp -otpExpiry");
    console.log("User found in auth middleware:", user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.isVerified = decoded.isVerified;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;