import express from "express";
import { addMovie, getMovie } from "../controllers/movies.controller";

export const movieRouter = express.Router();

movieRouter.post("/addMovie", addMovie);
movieRouter.get("/getMovie/:id", getMovie);
