import { prisma } from "@/config";

async function findMany() {
  return prisma.ticketType.findMany(); 
}

async function findFirstTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true,
    }
  });
}

async function findFirstEnrollment() {
  return prisma.enrollment.findFirst();
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED",    
    },
    include: {
      TicketType: true,
    }
  });
}

const ticketsRepository = {
  findMany,
  findFirstTicket,
  findFirstEnrollment,
  createTicket
};

export default ticketsRepository;

