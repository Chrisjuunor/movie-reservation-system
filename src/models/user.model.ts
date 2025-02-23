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

export const createUser = async (user: Omit<User, "id">) => {
  const query = {
    text: "INSERT INTO users(username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [user.username, user.email, user.password, user.role],
  };
  const result = await db.query(query);
  return result.rows[0];
};
