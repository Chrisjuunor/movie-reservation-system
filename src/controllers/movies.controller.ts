import { Request, Response } from "express";
import { createMovie } from "../models/movies.model";

export const addMovie = async (req: Request, res: Response) => {
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
