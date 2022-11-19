import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsType, getTickets, ticketsPost } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketsType)
  .post("/", ticketsPost);

export { ticketsRouter };
