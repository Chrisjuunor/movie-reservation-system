import express from "express";
import { cancelReservation, makeReservation, viewReservation } from "../controllers/reservation.controller";
import { authenticateToken } from "../middleware/auth.middle";

export const reservationsRouter = express.Router();

reservationsRouter.post("/add", authenticateToken, makeReservation);
reservationsRouter.get("/view/:id", authenticateToken, viewReservation);
reservationsRouter.delete("/cancel/:id", cancelReservation);