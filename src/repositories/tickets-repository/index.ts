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

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true
    }
  });
}

async function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({
    where: { 
      id: ticketId,
    },
    data: {
      status: "PAID",      
    }
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId }
  });
}

const ticketsRepository = {
  findMany,
  findFirstTicket,
  findFirstEnrollment,
  createTicket,
  findTicketById,
  updateTicketStatus,
  findTicketByEnrollmentId
};

export default ticketsRepository;

