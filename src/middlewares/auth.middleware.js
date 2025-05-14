import jwt from "jsonwebtoken";
import { findUser } from "../modules/auth/auth.service.js";

// ======================== Verify The Token ========================

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({ error: "Authorization token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await findUser({ id: decoded.id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    return res.status(500).json({ error: error.message });
  }
};

export default verifyToken;
