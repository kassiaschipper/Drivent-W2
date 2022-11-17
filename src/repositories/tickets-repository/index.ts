import { prisma } from "@/config";

async function findMany() {
  const tesste = prisma.ticketType.findMany();
  return tesste; 
}

const ticketsRepository = {
  findMany,
};

export default ticketsRepository;

