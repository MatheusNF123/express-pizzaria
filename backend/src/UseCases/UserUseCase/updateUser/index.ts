import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import { AppDataSource } from "../../../data-source";
import UpdateUserService from "./UpdateUserService";
import UpdateUserController from "./UpdateUserController";
import User from "../../../Database/Entities/User";
import validations from "../../../Validations";

const repository = new TypeormUserRepository(AppDataSource.getRepository(User));
const service = new UpdateUserService(repository, validations);
const controller = new UpdateUserController(service);

export default controller;
