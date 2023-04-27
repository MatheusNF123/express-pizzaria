import Cart from "../../../Database/Entities/Cart";
import TypeormCartRepository from "../../../Repository/implementations/TypeormCartRepository";

import { AppDataSource } from "../../../data-source";
import GetCartController from "./GetCartController";
import GetCartService from "./GetCartService";

const Repository = new TypeormCartRepository(
  AppDataSource.getRepository(Cart)
);

const service = new GetCartService(Repository);
const controller = new GetCartController(service);

export default controller;
