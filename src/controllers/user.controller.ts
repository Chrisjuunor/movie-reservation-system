import { Request, Response } from "express";
import { createUser, getUserByEmail, User } from "../models/user.model";
import bcrypt from "bcrypt";

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json(newUser);
  } catch (err: any) {
    console.error(`Error registering user ${err}`);
    res.status(500).json({ message: "Unable to register user!" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Please provide your credentials" });
      return;
    }

    const login = await getUserByEmail(email);

    res.status(200).json(login);
  } catch (err: any) {
    console.error(`Error logging in user ${err}`);
    res.status(500).json({ message: "Unable to log in user!" });
  }
};
