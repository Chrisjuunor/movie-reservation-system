import { Request, Response } from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
} from "../models/movies.model";

export const addMovie = async (req: Request, res: Response): Promise<void> => {
  const { title, description, duration, genre } = req.body;
  try {
    if (!title || !description || !duration || !genre) {
      res.status(400).json({ message: "Please enter movie properties" });
      return;
    }

    const movie = await createMovie({ title, description, duration, genre });
    if (!movie) {
      res.status(400).json({ message: "Movie not added!" });
      return;
    }

    res.status(201).json(movie);
  } catch (err: any) {
    console.error(`Error creating movie ${err}`);
    res.status(500).json({ message: "Unable to add movie!" });
  }
};

export const getMovie = async (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id as string);
  try {
    if (!id) {
      console.log(`Movie with id ${id} not found!`);
      res.status(400).json({ message: "Invalid movie id" });
      return;
    }

    const movie = await getMovieById(id);
    if (!movie) {
      console.log(`Unable to get movie with id ${id}`);
      res.status(404).json({ message: "movie not found!" });
      return;
    }

    res.status(200).json(movie);
  } catch (err: any) {
    console.error(`Error retrieving movie ${err}`);
    res.status(500).json({ message: `Unable to get movie` });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = [];
    const movie = await getAllMovies();

    if (!movie) {
      console.log("Unable to get movies!");
      res.status(400).json({ message: "Could not retrieve movie!" });
      return;
    }

    res.status(200).json(movie);
  } catch (err: any) {
    console.error(`Error retrieving movies ${err}`);
    res.status(500).json({ message: "Unable to get movies!" });
  }
};
