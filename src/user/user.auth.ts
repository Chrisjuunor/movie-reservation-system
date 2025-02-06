import { User } from "./user.service";
import { createUser, getUserByEmail } from "./user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.JWT_SECRETKEY as Secret;

//implementation of the signup functionality...
export const signUp = async (user: Omit<User, "id">) => {
  const hashedPassword: Promise<string> = bcrypt.hash(user.password, 10);
  user.password = await hashedPassword;
  const newUser = await createUser(user);
  //notetoself: jwt.sign carries param(payload, secret, subject &/ exp)
  const accessToken = jwt.sign({ id: newUser.id }, secretKey, {
    expiresIn: "1h",
  });
  return { token: accessToken };
};

//implementation of the signin functionality...
export const signIn = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  try {
    //check if the email and password fields are empty
    if (!email || !password) {
      console.log("Email and password fields cannot be empty!!");
      return null;
    }

    if (!user) {
      console.log("User does not exist!");
      return null;
    }

    //check if passwords match
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      console.log("Invalid email or password!");
      return null;
    }
    const accessToken = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "1h",
    });
    return accessToken;
  } catch (error: any) {}
};
