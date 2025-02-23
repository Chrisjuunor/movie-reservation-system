import { Request, Response } from "express";
import { createUser } from "../models/user.model";
import { User } from "../models/user.model";

interface UserBody {
  username: string;
  email: string;
  password: string;
  role: string;
}

export const registerUser = async (
  req: Request<{}, {}, UserBody>,
  res: Response
): Promise<void> => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password) {
      res.status(400).json({ message: "Please provide your credentials" });
      return;
    }

    const newUser = await createUser({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (err: any) {
    console.error(`Error registering user ${err}`);
    res.status(500).json({ message: "Unable to register user!" });
  }
};
