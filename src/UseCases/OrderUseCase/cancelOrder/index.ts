import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import TypeormOrderRepository from "../../../Repository/implementations/TypeormOrderRepository";
import User from "../../../Database/Entities/User";
import Order from "../../../Database/Entities/Order";

import { AppDataSource } from "../../../data-source";
import CancelOrderService from "./CancelOrderService";
import CancelOrderController from "./CancelOrderController";

const orderRepository = new TypeormOrderRepository(
  AppDataSource.getRepository(Order)
);

const userRepository = new TypeormUserRepository(
  AppDataSource.getRepository(User)
);

const orderRepositories = {
  order: orderRepository,
  user: userRepository,
};

const service = new CancelOrderService(orderRepositories);
const controller = new CancelOrderController(service);

export default controller;
