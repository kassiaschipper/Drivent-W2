import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayments, paymentPost } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", paymentPost);
  
export { paymentsRouter };
