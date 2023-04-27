import TypeormPizzaRepository from "../../../Repository/implementations/TypeormPizzaRepository";
import Pizza from '../../../Database/Entities/Pizza';
import { AppDataSource } from './../../../data-source';
import GetPizzaByIdController from "./GetPizzaByIdController";
import GetPizzaByIdService from "./GetPizzaByIdService";

const repository = new TypeormPizzaRepository(AppDataSource.getRepository(Pizza));
const getPizzaByIdService = new GetPizzaByIdService(repository);
const getPizzaByIdController = new GetPizzaByIdController(getPizzaByIdService);

export default getPizzaByIdController;
