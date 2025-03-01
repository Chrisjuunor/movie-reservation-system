import express from "express";
import {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../controllers/movies.controller";

export const movieRouter = express.Router();

movieRouter.post("/addMovie", addMovie);
movieRouter.get("/getMovie/:id", getMovie);
movieRouter.get("/getAllMovies", getMovies);
movieRouter.put("/editMovie/:id", updateMovie);
movieRouter.delete("/deleteMovie/:id", deleteMovie);
