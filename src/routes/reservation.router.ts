import express from "express";
import { cancelReservation, makeReservation, viewReservation } from "../controllers/reservation.controller";

export const reservationsRouter = express.Router();

reservationsRouter.post("/add", makeReservation);
reservationsRouter.get("/view/:id", viewReservation);
reservationsRouter.delete("/cancel/:id", cancelReservation);