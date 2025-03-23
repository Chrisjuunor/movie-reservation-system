import express from "express";
import { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  removeUser,
  updateUser,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middle";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Movie Reservation System..." });
  return;
});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update/:id", authenticateToken, updateUser);
userRouter.delete("/remove/:id", authenticateToken, removeUser);
