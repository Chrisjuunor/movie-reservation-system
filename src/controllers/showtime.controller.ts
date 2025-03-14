import { Request, Response } from "express";
import { getMovieDuration } from "../models/movies.model";
import {
  createShowtime,
  deleteShowtimeById,
  getShowtimeByMovieId,
} from "../models/showtimes.model";

export const addShowtime = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { movie_id, start_time } = req.body;
  console.log("start_time:", start_time);
  if (!movie_id || !start_time) {
    res.status(400).json({ message: "Please enter showtime properties" });
    return;
  }

  //extra layer of validation to ensure the type in the request body is correct...
  const start = new Date(start_time);
  if (isNaN(start.getTime())) {
    res.status(400).json({
      message:
        "Invalid start_time format. Use ISO 8601 format (e.g., '2023-10-25T18:00:00Z')",
    });
    return;
  }
  try {
    const duration = await getMovieDuration(movie_id);
    console.log(duration);
    if (!duration) {
      res.status(404).json({ message: "Movie not found!" });
      return;
    }

    //calculating the movie end_time from the start_time and duration...
    const end = new Date(start.getTime() + duration.duration * 60000); //Multiplying by 60000 because that is the number of milliseconds in a minute and duration as a value is in minutes...

    const showtime = await createShowtime({
      movie_id,
      start_time: start,
      end_time: end,
    });
    if (!showtime) {
      res.status(400).json({ message: "Movie showtime not added!" });
      return;
    }

    res.status(201).json(showtime);
  } catch (err: any) {
    console.error(`Error adding showtime ${err}`);
    res.status(500).json({ message: "Unable to add/create showtime" });
  }
};

export const retrieveShowtime = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { movie_id } = req.params;
  const movieId = parseInt(movie_id, 10);
  console.log("Movie_id:", movie_id, "Parsed movie_id:", movieId);
  try {
    if (isNaN(movieId)) {
      res.status(400).json({ message: "Invalid movie id" });
      return;
    }

    const showtime = await getShowtimeByMovieId(movieId);
    if (!showtime) {
      res.status(400).json({ message: "Unable to retrieve movie showtime!" });
      return;
    }

    if (showtime.length === 0) {
      res.status(404).json({
        message: `No movie showtimes found for movie with id ${movieId}`,
      });
      return;
    }

    res.status(200).json(showtime);
  } catch (err: any) {
    console.error(`Error retrieving showtime ${err}`);
    res.status(500).json({ message: "Unable to retrieve movie showtime" });
  }
};

export const removeShowtime = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  try {
    const removed = await deleteShowtimeById(id);
    if (!removed) {
      res.status(400).json({ message: "Showtime not removed!" });
      return;
    }

    res.status(204).json({ message: "Showtime successfully removed" });
  } catch (err: any) {
    console.error("Error deleting movie showtime", err);
    res.status(500).json({ message: "Unable to delete movie showtime!" });
  }
};
