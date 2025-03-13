import { Request, Response } from "express";
import { createReservation } from "../models/reservations.model";

export const makeReservation = async (req: Request, res: Response) => {
  const { user_id, showtime_id, seat_number, status } = req.body;
  if (!user_id || !showtime_id || !seat_number || !status) {
    res.status(400).json({ message: "Fields cannpt be empty!" });
    return;
  }

  try {
    const reservation = await createReservation({
      user_id,
      showtime_id,
      seat_number,
      status,
    });
    if (!reservation) {
      res.status(400).json({ message: "Error making reservation" });
      return;
    }

    res.status(201).json(reservation);
  } catch (err: any) {
    console.error("error making reservation", err);
    res.status(500).json({ message: "Error making reservation!" });
  }
};
