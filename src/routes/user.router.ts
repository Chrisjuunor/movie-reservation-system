import express from "express";
import { Request, Response } from "express";
import { registerUser } from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Movie Reservation System..." });
  return;
});

userRouter.post("/register", registerUser);
