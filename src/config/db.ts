import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DATABASE,
});

export const testConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Error connecting to Database!", error);
  }
};

export const db = pool;
