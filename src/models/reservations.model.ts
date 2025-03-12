import { db } from "../config/db";

type Reservation = {
  id: number;
  user_id: number;
  showtime_id: number;
  seat_number: string;
  status: string;
};

export const createReservation = async (
  reservation: Omit<Reservation, "id">
) => {
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
