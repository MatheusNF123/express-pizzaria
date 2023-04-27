import DeletePizzaService from "./DeletePizzaService";
import DeletePizzaController from "./DeletePizzaController";
import TypeormPizzaRepository from "../../../Repository/implementations/TypeormPizzaRepository";
import Pizza from "../../../Database/Entities/Pizza";
import { AppDataSource } from "../../../data-source";

const typeormPizzaRepository = new TypeormPizzaRepository(
  AppDataSource.getRepository(Pizza)
);
const deletePizzaService = new DeletePizzaService(typeormPizzaRepository);
const deletePizzaController = new DeletePizzaController(deletePizzaService);

export default deletePizzaController;
