import express from "express";
import "dotenv/config";
import { testConnection } from "./db/db";
import { userRouter } from "./user/user.router";

const app = express();

app.use(express.json());
app.use(userRouter);

const PORT: number = parseInt(process.env.PORT as string) || 5000;

testConnection();

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
