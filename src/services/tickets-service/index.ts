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

async function getTicketById(ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  return ticket;
}

async function getTicketByEnrollmentId(enrollmentId: number) {
  const ticket =  await ticketsRepository.findTicketByEnrollmentId(enrollmentId);
  return ticket; 
}

async function updateTicket(ticketId: number) {
  const updateStatus = await ticketsRepository.updateTicketStatus(ticketId);
  return updateStatus;
}

const ticketsService = {
  getTypes,
  getTicket,
  createTicket,
  getTicketById,
  updateTicket,
  getTicketByEnrollmentId 
};

export default ticketsService;
