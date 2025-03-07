import { db } from "../config/db";

export interface Showtime {
  id: number;
  movie_id: number;
  start_time: Date;
  end_time: Date;
}

// export const createShowtime = async (showtime: Omit<Showtime, "id">) => {
//   try {
//     if (
//       !(showtime.start_time instanceof Date) ||
//       !(showtime.end_time instanceof Date)
//     ) {
//       throw new Error("Invalid start_time or end_time");
//     }

//     const query = {
//       text: "INSERT INTO showtimes (movie_id, start_time, end_time) VALUES ($1, $2, $3) RETURNING *",
//       values: [
//         showtime.movie_id,
//         showtime.start_time.toISOString(),
//         showtime.end_time.toISOString(),
//       ],
//     };

//     const result = await db.query(query);
//     return result.rows[0];
//   } catch (err: any) {
//     console.error("Error adding showtime", err);
//     throw new Error("Unable to add showtime to movie");
//   }
// };

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
