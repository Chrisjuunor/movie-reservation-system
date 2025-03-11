import express from "express";
import {
  addShowtime,
  removeShowtime,
  retrieveShowtime,
} from "../controllers/showtime.controller";

export const ShowtimeRouter = express.Router();

ShowtimeRouter.post("/add", addShowtime);
ShowtimeRouter.get("/view/:movie_id", retrieveShowtime);
ShowtimeRouter.delete("/remove/:id", removeShowtime);
