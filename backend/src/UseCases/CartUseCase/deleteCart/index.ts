import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import TypeormCartRepository from "../../../Repository/implementations/TypeormCartRepository";
import User from "../../../Database/Entities/User";
import Cart from "../../../Database/Entities/Cart";

import { AppDataSource } from "../../../data-source";
import DeleteCartService from "./DeleteCartService";
import DeleteCartController from "./DeleteCartController";

const cartRepository = new TypeormCartRepository(
  AppDataSource.getRepository(Cart)
);

const userRepository = new TypeormUserRepository(
  AppDataSource.getRepository(User)
);

const cartRepositories = {
  cart: cartRepository,
  user: userRepository,
};

const service = new DeleteCartService(cartRepositories);
const controller = new DeleteCartController(service);

export default controller;
