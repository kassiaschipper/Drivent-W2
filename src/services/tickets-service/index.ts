import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function getTypes(): Promise<TicketType[]> {
  const type = await ticketsRepository.findMany();
  if (!type) throw notFoundError();
  return type;
}

const ticketsService = {
  getTypes
};

export default ticketsService;
