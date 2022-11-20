import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";
import { PaymentEntity, PaymentDataInsertion } from "@/protocols";
import enrollmentsService from "@/services/enrollments-service";

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

async function paymentPost(req: AuthenticatedRequest, res: Response) {
  const payment = req.body as PaymentEntity;
  const { userId } = req;

  if(!payment.ticketId) res.sendStatus(httpStatus.BAD_REQUEST);
  if(!payment.cardData) res.sendStatus(httpStatus.BAD_REQUEST);
    
  try {
    const ticketCheck = await ticketsService.getTicketById(payment.ticketId);
    if(!ticketCheck) res.sendStatus(httpStatus.NOT_FOUND);

    const enrollmentId = (await enrollmentsService.getOneWithAddressByUserId(userId)).id;
    const ticketCheckByEnrollmentId = await ticketsService.getTicketByEnrollmentId(enrollmentId);
    if(!ticketCheckByEnrollmentId.enrollmentId) res.sendStatus(httpStatus.UNAUTHORIZED);

    const paymentData = {
      ticketId: payment.ticketId,
      value: ticketCheck.TicketType.price,
      cardIssuer: payment.cardData.issuer,
      cardLastDigits: (payment.cardData.number).toString().slice(-4),
    } as PaymentDataInsertion;

    const insertPayment = await paymentsService.createPayment(paymentData);
    const updateTicketStatus = await ticketsService.updateTicket(payment.ticketId);
    const findPayment = await paymentsService.getPayment(payment.ticketId);

    return res.status(httpStatus.OK).send(findPayment);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export { getPayments, paymentPost };
