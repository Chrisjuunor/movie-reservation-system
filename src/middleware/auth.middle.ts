import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { getUserByEmail, User } from "../models/user.model";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided!" });
    return;
  }

  try {
    const payload = verifyToken(token);
    if (!payload) {
      res.status(403).json({ message: "Invalid or expired token!" });
      return;
    }

    const user = await getUserByEmail(payload.email);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    (req as any).user = user; // Attach the user object to `req.user`

    next();
  } catch (err: any) {
    console.error("Error authenticating token:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
