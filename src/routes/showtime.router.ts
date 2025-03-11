import express from "express";
import {
  addShowtime,
  retrieveShowtime,
} from "../controllers/showtime.controller";

export const ShowtimeRouter = express.Router();

ShowtimeRouter.post("/add", addShowtime);
ShowtimeRouter.get("/view/:movie_id", retrieveShowtime);
