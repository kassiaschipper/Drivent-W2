import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function getTypes(): Promise<TicketType[]> {
  const type = await ticketsRepository.findMany();
  if (!type) throw notFoundError();
  return type;
}

async function getTicket(enrollmentId: number) {
  const ticket = await ticketsRepository.findFirstTicket(enrollmentId);
  if (!ticket) throw notFoundError();
  
  return ticket;
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const ticket = await ticketsRepository.createTicket(ticketTypeId, enrollmentId);
  return ticket;
}

const ticketsService = {
  getTypes,
  getTicket,
  createTicket
};

export default ticketsService;
