import { db } from "../config/db";

type Reservation = {
  id: number;
  user_id: number;
  showtime_id: number;
  seat_number: number;
  status: string;
};

export const createReservation = async (
  reservation: Omit<Reservation, "id">
): Promise<Reservation> => {
  try {
    const query = {
      text: "INSERT INTO reservations (user_id, showtime_id, seat_number, status) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [
        reservation.user_id,
        reservation.showtime_id,
        reservation.seat_number,
        reservation.status,
      ],
    };

    const result = await db.query(query);
    return result.rows[0];
  } catch (err: any) {
    console.error("error creating reservation", err);
    throw new Error("Could not create new reservation");
  }
};

export const getReservation = async (
  id: number
): Promise<Reservation | null> => {
  try {
    const query = {
      text: "SELECT * FROM reservations WHERE id = $1",
      values: [id],
    };

    const result = await db.query(query);
    if (result.rows.length === 0) {
      console.log("No reservation found for id:", id);
      return null;
    }

    return result.rows[0];
  } catch (err: any) {
    console.error("error getting reservation", err);
    throw new Error("could not get reservation");
  }
};

export const deleteReservation = async (id: number) => {
  try {
    const query = {
      text: "DELETE FROM reservation WHERE id = $1 RETURNING *",
      value: [id],
    };

    const result = await db.query(query);
    return result.rows[0];
  } catch (err: any) {
    console.error("error removing reservation from db", err);
    throw new Error("could not delete reservation");
  }
};
