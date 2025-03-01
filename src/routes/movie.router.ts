import express from "express";
import { addMovie } from "../controllers/movies.controller";

export const movieRouter = express.Router();

movieRouter.post("/addMovie", addMovie);
