import { db } from "../config/db";

type Movie = {
  id: number;
  title: string;
  description: string;
  duration: string;
  genre: string;
};

export const createMovie = async (movie: Omit<Movie, "id">): Promise<Movie> => {
  try {
    const query = {
      text: "INSERT INTO movies (title, description, duration, genre) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [movie.title, movie.description, movie.duration, movie.genre],
    };

    const result = await db.query(query);
    return result.rows[0];
  } catch (err: any) {
    console.error("Error creating movie", err);
    throw new Error("Unable to create new movie!");
  }
};

export const getMovieById = async (id: number): Promise<Movie> => {
  try {
    const query = {
      text: "SELECT * FROM movies WHERE id = $1",
      vlaues: [id],
    };
    const result = await db.query(query);

    if (!result) {
      console.log("No rows returned!");
    }
    const movie = result.rows[0];
    return movie as Movie;
  } catch (err: any) {
    console.error("Error returning movie", err);
    throw new Error("Unable to get movie!");
  }
};

export const updateMovieById = async (
  id: number,
  movie: Omit<Movie, "id">
): Promise<Movie> => {
  try {
    const query = {
      text: "UPDATE movies SET title = $1, description = $2, duration = $3, genre = $4 WHERE id = $5 RETURNING *",
      values: [movie.title, movie.description, movie.duration, movie.genre, id],
    };
    const result = await db.query(query);

    if (!result) {
      console.log("No rows updated!");
    }
    return result.rows[0];
  } catch (err: any) {
    console.error("Error updating movies relation", err);
    throw new Error("Unable to update movie!");
  }
};
