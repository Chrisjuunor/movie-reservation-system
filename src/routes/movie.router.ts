import express from "express";
import {
  addMovie,
  getMovie,
  getMovies,
} from "../controllers/movies.controller";

export const movieRouter = express.Router();

movieRouter.post("/addMovie", addMovie);
movieRouter.get("/getMovie/:id", getMovie);
movieRouter.get("/getAllMovies", getMovies);
