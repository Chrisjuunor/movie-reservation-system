import { Request, Response } from "express";
import {
  createReservation,
  getReservation,
} from "../models/reservations.model";

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

export const viewReservation = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid reservation id" });
    return;
  }

  try {
    const reservation = await getReservation(id);
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found!" });
      return;
    }

    res.status(200).json(reservation);
  } catch (err: any) {
    console.error("Error getting reservation", err);
    res.status(500).json({ message: "Error getting reservation!" });
  }
};
