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

export const getShowtimeByMovieId = async (
  movie_id: number
): Promise<Showtime[]> => {
  try {
    const query = {
      text: "SELECT * FROM showtimes WHERE movie_id = $1",
      values: [movie_id],
    };

    const result = await db.query(query);
    const showtime = result.rows[0];
    return showtime as Showtime[];
  } catch (err: any) {
    console.error("Error geting movie showtime", err);
    throw new Error("Unable to get showtime for movie");
  }
};

export const deleteShowtimeById = async (id: number): Promise<null> => {
  try {
    const query = {
      text: "DELETE * FROM showtimes WHERE id = $1",
      value: [id],
    };

    const result = await db.query(query);
    return result.rows[0];
  } catch (err: any) {
    console.error("Error deleting movie showtime", err);
    throw new Error("Unable to delete showtime");
  }
};
