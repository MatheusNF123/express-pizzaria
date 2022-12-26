import { AppDataSource } from "./../../../data-source";
import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import GetAllUsersController from "./GetAllUsersController";
import GetAllUsersService from "./GetAllUsersService";
import User from "../../../Database/Entities/User";

const repository = new TypeormUserRepository(AppDataSource.getRepository(User));
const getAllUsersService = new GetAllUsersService(repository);
const getAllUsersController = new GetAllUsersController(getAllUsersService);

export default getAllUsersController;
