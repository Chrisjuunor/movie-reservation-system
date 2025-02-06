import express from "express";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as authService from "./user.auth";

export const userRouter = express.Router();

//Testing 123...
userRouter.get("/", (req: Request, res: Response) => {
  res.send("Movie Reservation System...");
});

//user signup
userRouter.post(
  "/api/signup",
  body("username").isString(),
  body("email").isString(),
  body("password").isString(),
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const user = req.body;
      const newUser = await authService.signUp(user);
      if (!newUser) {
        res.status(400).json({ message: "User not created!" });
        return;
      }
      res
        .status(201)
        .json({ message: "User created suucessully", user: newUser });
      return;
    } catch (error: any) {
      res.status(500).json(error);
      return;
    }
  }
);

//user login
userRouter.post(
  "/api/signin",
  body("email").isString(),
  body("password").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    
    try {
      const { email, password } = req.body;
      const login = await authService.signIn(email, password);
      if (!login) {
        res.status(400).json({ message: "Invalid credentials!" });
        return;
      }
      res.status(200).json(login);
      return;
    } catch (error: any) {
      console.error("error signing in: ", error);
      res.status(500).json(error);
      return;
    }
  }
);
