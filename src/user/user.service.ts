import { db } from "../db/db";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

//DB query to add new user to the DB
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { rows } = await db.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [user.username, user.email, user.password]
  );
  return rows[0];
};

//DB query to select user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0] || null;
  } catch (error: any) {
    console.error("Error fetching user", error);
    return null;
  }
};
