import express from "express";
import "dotenv/config";
import { testConnection } from "./config/db";
import { userRouter } from "./routes/user.router";
import { movieRouter } from "./routes/movie.router";
import { ShowtimeRouter } from "./routes/showtime.router";
import { reservationsRouter } from "./routes/reservation.router";

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/showtime", ShowtimeRouter);
app.use("/api/reservations", reservationsRouter);

const PORT = parseInt(process.env.PORT as string) || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
  testConnection();
});
