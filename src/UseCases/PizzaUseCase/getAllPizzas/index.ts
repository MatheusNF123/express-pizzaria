import { AppDataSource } from './../../../data-source';
import TypeormPizzaRepository from "../../../Repository/implementations/TypeormPizzaRepository";
import GetAllPizzasController from "./GetAllPizzasController";
import GetAllPizzasService from "./GetAllPizzasService";
import Pizza from '../../../Database/Entities/Pizza';

const repository = new TypeormPizzaRepository(AppDataSource.getRepository(Pizza));
const getAllPizzasService = new GetAllPizzasService(repository);
const getAllPizzasController = new GetAllPizzasController(getAllPizzasService);

export default getAllPizzasController;
