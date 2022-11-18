import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsType, getTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketsType);

export { ticketsRouter };
