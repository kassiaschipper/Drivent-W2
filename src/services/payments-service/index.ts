import { notFoundError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";

async function getPayment(ticketId: number) {    
  const paymentById = await paymentsRepository.findFirst(ticketId);
  if(!paymentById) throw notFoundError; 
  return paymentById;
}

const paymentsService = {
  getPayment
};
export default paymentsService; 
