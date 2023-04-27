import TypeormPizzaRepository from "../../../Repository/implementations/TypeormPizzaRepository";
import { AppDataSource } from "../../../data-source";
import UpdatePizzaService from "./UpdatePizzaService";
import UpdatePizzaController from "./UpdatePizzaController";
import Pizza from "../../../Database/Entities/Pizza";
import validations from "../../../Validations";

const repository = new TypeormPizzaRepository(AppDataSource.getRepository(Pizza));
const service = new UpdatePizzaService(repository, validations);
const controller = new UpdatePizzaController(service);

export default controller;
