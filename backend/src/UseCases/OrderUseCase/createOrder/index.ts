import TypeormOrderRepository from "../../../Repository/implementations/TypeormOrderRepository";
import TypeormOrdersPizzasRepository from "../../../Repository/implementations/TypeormOrdersPizzasRepository";
import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import TypeormPizzaRepository from "../../../Repository/implementations/TypeormPizzaRepository";

import Order from "../../../Database/Entities/Order";
import OrdersPizzas from "../../../Database/Entities/OrdersPizzas";
import User from "../../../Database/Entities/User";
import Pizza from "../../../Database/Entities/Pizza";

import { AppDataSource } from "../../../data-source";
import validations from "../../../Validations";
import CreateOrderController from "./CreateOrderController";
import CreateOrderService from "./CreateOrderService";
import Cart from "../../../Database/Entities/Cart";
import TypeormCartRepository from "../../../Repository/implementations/TypeormCartRepository";

const orderRepository = new TypeormOrderRepository(
  AppDataSource.getRepository(Order)
);
const ordersPizzasRepository = new TypeormOrdersPizzasRepository(
  AppDataSource.getRepository(OrdersPizzas)
);
const userRepository = new TypeormUserRepository(
  AppDataSource.getRepository(User)
);
const pizzaRepository = new TypeormPizzaRepository(
  AppDataSource.getRepository(Pizza)
);
const cartRepository = new TypeormCartRepository(
  AppDataSource.getRepository(Cart)
);

const orderRepositories = {
  order: orderRepository,
  ordersPizzas: ordersPizzasRepository,
  user: userRepository,
  pizza: pizzaRepository,
  cart: cartRepository
};

const service = new CreateOrderService(orderRepositories, validations);
const controller = new CreateOrderController(service);

export default controller;
