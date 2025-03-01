import { Request, Response } from "express";
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  updateUserById,
  User,
} from "../models/user.model";
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

  if (!email || !password) {
    res.status(400).json({ message: "Please provide your credentials" });
    return;
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "Invalid email or password" });
      return;
    }

    //ensures the user does have a password
    if (!user.password) {
      console.error(`User object does not have a password field: ${user}`);
      res
        .status(500)
        .json({ message: "Internal server error: Invalid user data" });
      return;
    }

    console.log("User from database:", user);
    // console.log("Password from request:", password); --> currrently unnecessary

    const isPassword = await bcrypt.compare(password, user.password);
    console.log(`Is password valid? ${isPassword}`);
    if (!isPassword) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    res.status(200).json(user);
  } catch (err: any) {
    console.error(`Error logging in user ${err}`);
    res.status(500).json({ message: "Unable to log in user!" });
  }
};

export const updateUser = async (
  req: Request<{ id: string }, {}, UserBody>,
  res: Response
) => {
  const id: number = parseInt(req.params.id as string);
  console.log(id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid user ID!" });
    return;
  }
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      res.status(400).json();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userUpdate = await updateUserById(id, {
      username,
      email,
      password: hashedPassword,
    });
    console.log(userUpdate);
    if (!userUpdate) {
      res.status(404).json({ message: `User with ID ${id} not found!` });
      return;
    }
    res.status(200).json(userUpdate);
  } catch (err: any) {
    console.error(`Error updating user ${err}`);
    res.status(500).json({ message: "Unable to update user!" });
  }
};

export const removeUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid user ID!" });
    return;
  }

  try {
    const deleteUser = await deleteUserById(id);
    if (!deleteUser) {
      res.status(400).json({ message: "Unable to delete user!" });
      return;
    }
    // console.log("User deleted:", deleteUser);  --> auseful during debugging
    res.status(204).json({ message: "User removed successfully!" });
  } catch (err: any) {
    console.error(`Error completing action ${err}`);
    res.status(500).json({ message: "Unable to delete user!" });
  }
};
