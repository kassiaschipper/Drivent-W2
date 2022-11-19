import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";

async function getPayments(req: AuthenticatedRequest, res: Response ) {
  const { ticketId } = req.query;
        
  if (!ticketId) res.sendStatus(httpStatus.BAD_REQUEST);
       
  try {
    const ticketCheck = await ticketsService.getTicketById(Number(ticketId));
    if(!ticketCheck) res.sendStatus(httpStatus.NOT_FOUND);

    const payment = await paymentsService.getPayment(Number(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export { getPayments };
