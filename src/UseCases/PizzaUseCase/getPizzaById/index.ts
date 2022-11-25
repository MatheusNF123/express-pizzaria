import MongoosePizzaRepository from "../../../Repository/implementations/MongoosePizza.repository";
import GetPizzaByIdController from "./GetPizzaByIdController";
import GetPizzaByIdService from "./GetPizzaByIdService";

const repository = new MongoosePizzaRepository();
const getPizzaByIdService = new GetPizzaByIdService(repository);
const getPizzaByIdController = new GetPizzaByIdController(getPizzaByIdService);

export default getPizzaByIdController;
