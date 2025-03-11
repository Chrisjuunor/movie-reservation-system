import { db } from "../config/db";

export interface Showtime {
  id: number;
  movie_id: number;
  start_time: Date;
  end_time: Date;
}

export const createShowtime = async (showtime: Omit<Showtime, "id">) => {
  try {
    // Ensure start_time and end_time are valid Date objects
    if (
      !(showtime.start_time instanceof Date) ||
      isNaN(showtime.start_time.getTime())
    ) {
      throw new Error("Invalid start_time");
    }

    if (
      !(showtime.end_time instanceof Date) ||
      isNaN(showtime.end_time.getTime())
    ) {
      throw new Error("Invalid end_time");
    }

    // Convert Date objects to ISO strings (includes time zone)
    const startTimeISO = showtime.start_time.toISOString();
    const endTimeISO = showtime.end_time.toISOString();

    const query = {
      text: "INSERT INTO showtimes (movie_id, start_time, end_time) VALUES ($1, $2, $3) RETURNING *",
      values: [showtime.movie_id, startTimeISO, endTimeISO],
    };

    console.log("Executing query:", query);

    const result = await db.query(query);
    return result.rows[0];
  } catch (err: any) {
    console.error("Error adding showtime:", err.message);
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

    console.log("Executing query", query);

    const result = await db.query(query);
    if (!result) {
      console.log("No rows returned!");
    }

    const showtime = result.rows;
    return showtime;
  } catch (err: any) {
    console.error("Error geting movie showtime", err);
    throw new Error("Unable to get showtime for movie");
  }
};

export const deleteShowtimeById = async (id: number) => {
  try {
    const query = {
      text: "DELETE FROM showtimes WHERE id = $1 RETURNING *",
      values: [id],
    };
    console.log("Executing query", query);

    const result = await db.query(query);
    if (result.rowCount === 0) {
      console.log("No rows were deleted!");
      return null;
    }

    return result.rows[0];
  } catch (err: any) {
    console.error("Error deleting movie showtime", err);
    throw new Error("Unable to delete showtime");
  }
};
