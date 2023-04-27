import Order from "../../../Database/Entities/Order";
import TypeormOrderRepository from "../../../Repository/implementations/TypeormOrderRepository";

import { AppDataSource } from "../../../data-source";
import GetAllOrdersController from "./GetAllOrdersController";
import GetAllOrdersService from "./GetAllOrdersService";

const orderRepository = new TypeormOrderRepository(
  AppDataSource.getRepository(Order)
);

const service = new GetAllOrdersService(orderRepository);
const controller = new GetAllOrdersController(service);

export default controller;
