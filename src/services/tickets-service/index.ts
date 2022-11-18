import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function getTypes(): Promise<TicketType[]> {
  const type = await ticketsRepository.findMany();
  if (!type) throw notFoundError();
  return type;
}

async function getTicket() {
  const ticket = await ticketsRepository.findManyTickets();
  if (!ticket) throw notFoundError();
  return ticket;
}

const ticketsService = {
  getTypes,
  getTicket
};

export default ticketsService;
