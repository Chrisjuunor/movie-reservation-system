import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string) || 5432,
});

export const testConnection = async () => {
  try {
    const result = await pool.query("SELECT 1");
    console.log("Database connected successfully...");
  } catch (error: any) {
    console.error(`Error connecting to database: ${error}`);
  }
};

export const db = pool;
