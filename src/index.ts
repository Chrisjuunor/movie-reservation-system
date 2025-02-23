import express from "express";
import "dotenv/config";
import { testConnection } from "./config/db";
import { userRouter } from "./routes/user.router";

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

const PORT = parseInt(process.env.PORT as string) || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
  testConnection();
});
