import CreatePizzaService from "./CreatePizzaService";
import CreatePizzaController from "./CreatePizzaController";
import TypeormPizzaRepository from "../../../Repository/implementations/TypeormPizzaRepository";
import Pizza from "../../../Database/Entities/Pizza";
import { AppDataSource } from "../../../data-source";
import validations from "../../../Validations";

const typeormPizzaRepository = new TypeormPizzaRepository(
  AppDataSource.getRepository(Pizza)
);
const createPizzaService = new CreatePizzaService(typeormPizzaRepository, validations);
const createPizzaController = new CreatePizzaController(createPizzaService);

export default createPizzaController;
