import TypeormCartRepository from "../../../Repository/implementations/TypeormCartRepository";
import TypeormCartPizzasRepository from "../../../Repository/implementations/TypeormCartPizzasRepository";
import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";

import Cart from "../../../Database/Entities/Cart";
import CartPizzas from "../../../Database/Entities/CartPizzas";
import User from "../../../Database/Entities/User";

import { AppDataSource } from "../../../data-source";
import validations from "../../../Validations";
import UpdateCartItemController from "./UpdateCartItemController";
import UpdateCartItemService from "./UpdateCartItemService";

const cartRepository = new TypeormCartRepository(
  AppDataSource.getRepository(Cart)
);
const cartPizzasRepository = new TypeormCartPizzasRepository(
  AppDataSource.getRepository(CartPizzas)
);
const userRepository = new TypeormUserRepository(
  AppDataSource.getRepository(User)
);

const cartRepositories = {
  cart: cartRepository,
  cartItem: cartPizzasRepository,
  user: userRepository,
};

const service = new UpdateCartItemService(cartRepositories, validations);
const controller = new UpdateCartItemController(service);

export default controller;
