import Order from "../../../Database/Entities/Order";
import TypeormOrderRepository from "../../../Repository/implementations/TypeormOrderRepository";

import { AppDataSource } from "../../../data-source";
import CheckoutOrderController from "./CheckoutOrderController";
import CheckoutOrderService from "./UpdateOrderService";

const orderRepository = new TypeormOrderRepository(
  AppDataSource.getRepository(Order)
);

const service = new CheckoutOrderService(orderRepository);
const controller = new CheckoutOrderController(service);

export default controller;
