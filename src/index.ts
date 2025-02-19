import express from "express";
import "dotenv/config";
import { testConnection } from "./config/db";

const app = express();

app.use(express.json());

const PORT = parseInt(process.env.PORT as string) || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
  testConnection();
});
