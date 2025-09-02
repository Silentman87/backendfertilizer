import jwt from "jsonwebtoken";
import Farmer from "../models/Farmer.js";
import generatetoken from "../utils/generatetoken.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  
    if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.farmerId = decoded.id; // ✅ farmerId from token
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

};

export default authMiddleware;

