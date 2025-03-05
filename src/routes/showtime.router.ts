import express from "express";
import { addShowtime } from "../controllers/showtime.controller";

export const ShowtimeRouter = express.Router();

ShowtimeRouter.post("/add", addShowtime);
