import { prisma } from "@/config";

async function findFirst(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

const paymetsRepository = {
  findFirst,    
};
  
export default paymetsRepository;
