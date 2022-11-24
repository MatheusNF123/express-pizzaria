import MongoosePizzaRepository from "../../../Repository/implementations/MongoosePizza.repository";
import GetAllPizzasController from "./GetAllPizzasController";
import GetAllPizzasService from "./GetAllPizzasService";

const repository = new MongoosePizzaRepository();
const getAllPizzasService = new GetAllPizzasService(repository);
const getAllPizzasController = new GetAllPizzasController(getAllPizzasService);

export default getAllPizzasController;
