import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import User from "../../../Database/Entities/User";
import { AppDataSource } from "../../../data-source";
import validations from "../../../Validations";
import CreateUserController from "./CreateUserController";
import CreateUserService from "./CreateUserService";

const repository = new TypeormUserRepository(AppDataSource.getRepository(User));
const service = new CreateUserService(repository, validations);
const controller = new CreateUserController(service);

export default controller;
