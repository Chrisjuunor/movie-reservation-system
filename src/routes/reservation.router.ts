import express from "express";
import { makeReservation } from "../controllers/reservation.controller";

export const reservationsRouter = express.Router();

reservationsRouter.post("/add", makeReservation);