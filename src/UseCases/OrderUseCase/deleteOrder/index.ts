import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import TypeormOrderRepository from "../../../Repository/implementations/TypeormOrderRepository";
import User from "../../../Database/Entities/User";
import Order from "../../../Database/Entities/Order";

import { AppDataSource } from "../../../data-source";
import DeleteOrderService from "./DeleteOrderService";
import DeleteOrderController from "./DeleteOrderController";

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

const service = new DeleteOrderService(orderRepositories);
const controller = new DeleteOrderController(service);

export default controller;
