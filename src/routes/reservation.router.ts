import express from "express";
import { makeReservation, viewReservation } from "../controllers/reservation.controller";

export const reservationsRouter = express.Router();

reservationsRouter.post("/add", makeReservation);
reservationsRouter.get("/view/:id", viewReservation);