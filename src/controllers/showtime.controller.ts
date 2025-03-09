import { Request, Response } from "express";
import { getMovieDuration } from "../models/movies.model";
import { createShowtime } from "../models/showtimes.models";

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
