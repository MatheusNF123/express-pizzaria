import TypeormOrdersPizzasRepository from "../../../Repository/implementations/TypeormOrdersPizzasRepository";
import OrdersPizzas from "../../../Database/Entities/OrdersPizzas";

import { AppDataSource } from "../../../data-source";
import GetAllOrdersController from "./GetAllOrdersController";
import GetAllOrdersService from "./GetAllOrdersService";

const ordersPizzasRepository = new TypeormOrdersPizzasRepository(
  AppDataSource.getRepository(OrdersPizzas)
);

const service = new GetAllOrdersService(ordersPizzasRepository);
const controller = new GetAllOrdersController(service);

export default controller;
