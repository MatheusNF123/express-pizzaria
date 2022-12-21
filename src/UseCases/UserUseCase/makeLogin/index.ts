import MakeLoginService from "./MakeLoginService";
import MakeLoginController from "./MakeLoginController";
import TypeormUserRepository from "../../../Repository/implementations/TypeormUserRepository";
import User from "../../../Database/Entities/User";
import { AppDataSource } from "../../../data-source";

const typeormUserRepository = new TypeormUserRepository(
  AppDataSource.getRepository(User)
);
const makeLoginService = new MakeLoginService(typeormUserRepository);
const makeLoginController = new MakeLoginController(makeLoginService);

export default makeLoginController;
