import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import User from "../../../Database/Entities/User";
import { AppDataSource } from '../../../data-source';
import GetUserController from "./GetUserController";
import GetUserService from "./GetUserService";

const repository = new TypeormUserRepository(AppDataSource.getRepository(User));
const getUserService = new GetUserService(repository);
const getUserController = new GetUserController(getUserService);

export default getUserController;
