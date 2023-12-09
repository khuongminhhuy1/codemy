import "dotenv/config.js";
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded.user;

    next();
  });
}
