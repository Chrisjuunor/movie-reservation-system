import { db } from "../config/db";

export interface Showtime {
  id: number;
  movie_id: number;
  start_time: Date;
  end_time: Date;
}

export const createShowtime = async (showtime: Omit<Showtime, "id">) => {
  try {
    const query = {
      text: "INSERT INTO showtimes (movie_id, start_time, end_time) VALUES ($1, $2, $3) RETURNING *",
      values: [showtime.movie_id, showtime.start_time, showtime.end_time],
    };

    const result = await db.query(query);
    return result.rows[0];
  } catch (err: any) {
    console.error("Error adding showtime", err);
    throw new Error("Unable to add showtime to movie");
  }
};
