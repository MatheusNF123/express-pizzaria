import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import User from "../../../Database/Entities/User";
import { AppDataSource } from "../../../data-source";
import DeleteUserService from "./DeleteUserService";
import DeleteUserController from "./DeleteUserController";


const repository = new TypeormUserRepository(AppDataSource.getRepository(User));
const service = new DeleteUserService(repository);
const controller = new DeleteUserController(service);

export default controller;
