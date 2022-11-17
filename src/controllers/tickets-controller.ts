import { Request, Response } from "express";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";

async function getTicketsType(_req: Request, res: Response) {
  try {
    const type = await ticketsService.getTypes();
    return res.status(httpStatus.OK).send(type);
  } catch (error) {
    return res.status(httpStatus.OK).send([]);
  }
}

export { getTicketsType };
