import { prisma } from "@/config";
import { PaymentDataInsertion } from "@/protocols";

async function findFirst(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createOne(paymentData: PaymentDataInsertion) {
  return prisma.payment.create({
    data: paymentData,
  });
}

const paymetsRepository = {
  findFirst,
  createOne    
};
  
export default paymetsRepository;
