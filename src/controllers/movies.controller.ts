import { Request, Response } from "express";
import {
  createMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "../models/movies.model";

interface movieFields {
  title: string;
  description: string;
  duration: number;
  genre: string;
}

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

export const getMovie = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
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

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await getAllMovies();

    if (!movies) {
      console.log("Unable to get movies!");
      res.status(400).json({ message: "Could not retrieve movie!" });
      return;
    }

    res.status(200).json(movies);
  } catch (err: any) {
    console.error(`Error retrieving movies ${err}`);
    res.status(500).json({ message: "Unable to get movies!" });
  }
};

export const updateMovie = async (
  req: Request<{ id: string }, {}, movieFields>,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid movie ID!" });
    return;
  }

  const { title, description, duration, genre } = req.body;

  try {
    if (!title || !description || !duration || !genre) {
      res.status(400).json({ message: "Fields cannot be empty" });
      return;
    }

    //check if movie with id exists in the db
    const movie = await getMovieById(id);
    if (!movie) {
      console.log(`Movie with id ${id} not found in the database!`);
      res.status(404).json({ message: `Movie with id ${id} not found!` });
      return;
    }

    const update = await updateMovieById(id, {
      title,
      description,
      duration,
      genre,
    });
    console.log(update);
    if (!update) {
      res.status(400).json({ message: `Error updating by with id ${id}` });
      return;
    }

    res.status(200).json(update);
  } catch (err: any) {
    console.error(`Error updating movie ${err}`);
    res.status(500).json({ message: "Unable to update movie!" });
  }
};

export const deleteMovie = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid movie ID!" });
    return;
  }

  try {
    const movie = await getMovieById(id);
    if (!movie) {
      res.status(404).json({ message: `Movie with id ${id} not found!` });
      return;
    }

    const deleteMovie = await deleteMovieById(id);
    if (!deleteMovie) {
      res.status(400).json({ message: "Unable to delete movie!" });
      return;
    }

    res.status(204).json({ message: "Movie deleted successfully!" });
  } catch (err: any) {
    res.status(500).json({ message: "Unable to delete movie!" });
  }
};
