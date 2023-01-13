import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import TypeormCartRepository from "../../../Repository/implementations/TypeormCartRepository";
import TypeormCartPizzasRepository from "../../../Repository/implementations/TypeormCartPizzasRepository";
import User from "../../../Database/Entities/User";
import Cart from "../../../Database/Entities/Cart";
import CartPizzas from "../../../Database/Entities/CartPizzas";

import { AppDataSource } from "../../../data-source";
import DeleteCartItemService from "./DeleteCartItemService";
import DeleteCartItemController from "./DeleteCartItemController";

const cartRepository = new TypeormCartRepository(
  AppDataSource.getRepository(Cart)
);

const cartItemRepository = new TypeormCartPizzasRepository(
  AppDataSource.getRepository(CartPizzas)
);

const userRepository = new TypeormUserRepository(
  AppDataSource.getRepository(User)
);

const cartRepositories = {
  cart: cartRepository,
  cartItem: cartItemRepository,
  user: userRepository,
};

const service = new DeleteCartItemService(cartRepositories);
const controller = new DeleteCartItemController(service);

export default controller;
