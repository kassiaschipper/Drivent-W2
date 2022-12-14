import { Response } from "express";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import { TicketEntity }  from "@/protocols";

async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const type = await ticketsService.getTypes();
    return res.status(httpStatus.OK).send(type);
  } catch (error) {
    return res.status(httpStatus.OK).send([]);
  }
}

async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const enrollmentId = (await enrollmentsService.getOneWithAddressByUserId(userId)).id;
    const ticket = await ticketsService.getTicket(enrollmentId);
    return res.send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

async function ticketsPost(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as ticketTypeId;
  const { userId } = req;
  
  if(!ticketTypeId) res.sendStatus(httpStatus.BAD_REQUEST);
  
  try {
    const enrollmentId = (await enrollmentsService.getOneWithAddressByUserId(userId)).id;
    const ticket = await ticketsService.createTicket(ticketTypeId, enrollmentId) as TicketEntity;

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export type ticketTypeId = Pick<TicketEntity, "ticketTypeId">;

export { getTicketsType, getTickets, ticketsPost };
