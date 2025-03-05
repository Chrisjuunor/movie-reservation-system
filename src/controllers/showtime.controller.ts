import { Request, Response } from "express";
import { getMovieDuration } from "../models/movies.model";

export const addShowtime = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { movie_id, start_time, end_time } = req.body;
  if (!movie_id || !start_time || !end_time) {
    res.status(400).json({ message: "Please enter showtime properties" });
    return;
  }
  try {
    const duration = await getMovieDuration(movie_id);
    console.log(duration);
  } catch (err: any) {
    console.error(`Error adding showtime ${err}`);
    res.status(500).json({ message: "Unable to add/create showtime" });
  }
};
