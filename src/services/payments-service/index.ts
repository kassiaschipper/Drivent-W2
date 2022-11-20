import { notFoundError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import { PaymentDataInsertion } from "@/protocols";

async function getPayment(ticketId: number) {    
  const paymentById = await paymentsRepository.findFirst(ticketId);
  if(!paymentById) throw notFoundError; 
  return paymentById;
}

async function createPayment(paymentData: PaymentDataInsertion ) {
  const create = await paymentsRepository.createOne(paymentData);
  return create;
}

const paymentsService = {
  getPayment,
  createPayment,
};
export default paymentsService; 
