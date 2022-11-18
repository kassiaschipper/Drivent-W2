import { prisma } from "@/config";

async function findMany() {
  return prisma.ticketType.findMany(); 
}

async function findManyTickets() {
  return prisma.ticket.findMany({
    include: {
      TicketType: true,
    }

  });
}

const ticketsRepository = {
  findMany,
  findManyTickets
};

export default ticketsRepository;

