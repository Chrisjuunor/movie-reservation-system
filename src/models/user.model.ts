import { Pool } from "pg";
import { db } from "../config/db";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
};

const pool = new Pool();

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  try {
    const query = {
      text: "INSERT INTO users(username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [user.username, user.email, user.password, user.role],
    };
    const result = await db.query(query);
    return result.rows[0];
  } catch (err: any) {
    console.error("Error creating user", err);
    throw new Error("unable to create user");
  }
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };
  const result = await db.query(query);
  const user = result.rows[0];

  return user as User;
};

export const updateUserById = async (
  id: number,
  user: Omit<User, "id" | "role">
): Promise<User> => {
  try {
    const query = {
      text: "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      values: [user.username, user.email, user.password, id],
    };
    const result = await db.query(query);
    if (!result) {
      console.log("No rows were afected!");
    }
    return result.rows[0];
  } catch (err: any) {
    console.error("Error updating user", err);
    throw new Error("Unable to update user");
  }
};

export const deleteUser = async (id: number): Promise<null> => {
  const query = {
    text: "DELETE FROM users WHERE id = $1",
    values: [id],
  };
  const result = await db.query(query);
  return result.rows[0];
};
