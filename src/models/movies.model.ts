import { db } from "../config/db";

type Movie = {
  id: number;
  title: string;
  description: string;
  duration: number;
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
      values: [id],
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

export const getMovieDuration = async (id: number) => {
  try {
    const query = {
      text: "SELECT duration FROM movies WHERE id = $1",
      values: [id],
    };
    const result = await db.query(query);
    if (!result) {
      console.log("No rows returned!");
    }
    const duration = result.rows[0];
    return duration;
  } catch (err: any) {
    console.error("Error returning movie duration", err);
    throw new Error("Unable to get duration!");
  }
};

export const getAllMovies = async (): Promise<Movie[]> => {
  try {
    const query = {
      text: "SELECT * FROM movies",
    };
    const result = await db.query(query);

    if (!result) {
      console.log("No rows returned!");
    }
    const movies = result.rows as Movie[];
    return movies;
  } catch (err: any) {
    console.error("Error returning movies", err);
    throw new Error("Unable to get movies!");
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

export const deleteMovieById = async (id: number): Promise<null> => {
  try {
    const query = {
      text: "DELETE FROM movies WHERE id = $1 RETURNING *",
      values: [id],
    };
    const result = await db.query(query);
    if (!result) {
      console.log("No rows were deleted!");
    }
    return result.rows[0];
  } catch (err: any) {
    console.error("Error removing movie", err);
    throw new Error(`Unable to delete movie with id ${id}`);
  }
};
