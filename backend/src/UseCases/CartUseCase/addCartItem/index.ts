import TypeormCartRepository from "../../../Repository/implementations/TypeormCartRepository";
import TypeormCartPizzasRepository from "../../../Repository/implementations/TypeormCartPizzasRepository";
import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import TypeormPizzaRepository from "../../../Repository/implementations/TypeormPizzaRepository";

import Cart from "../../../Database/Entities/Cart";
import CartPizzas from "../../../Database/Entities/CartPizzas";
import User from "../../../Database/Entities/User";
import Pizza from "../../../Database/Entities/Pizza";

import { AppDataSource } from "../../../data-source";
import validations from "../../../Validations";
import AddCartItemController from "./AddCartItemController";
import AddCartItemService from "./AddCartItemService";

const cartRepository = new TypeormCartRepository(
  AppDataSource.getRepository(Cart)
);
const cartPizzasRepository = new TypeormCartPizzasRepository(
  AppDataSource.getRepository(CartPizzas)
);
const userRepository = new TypeormUserRepository(
  AppDataSource.getRepository(User)
);
const pizzaRepository = new TypeormPizzaRepository(
  AppDataSource.getRepository(Pizza)
);

const cartRepositories = {
  cart: cartRepository,
  cartPizzas: cartPizzasRepository,
  user: userRepository,
  pizza: pizzaRepository,
};

const service = new AddCartItemService(cartRepositories, validations);
const controller = new AddCartItemController(service);

export default controller;
