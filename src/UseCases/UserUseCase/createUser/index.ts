import MongooseUserRepository from "../../../Repository/implementations/MongooseUser.repository";
import validations from "../../../Validations";
import CreateUserController from "./CreateUserController";
import CreateUserService from "./CreateUserService";

const repository = new MongooseUserRepository();
const service = new CreateUserService(repository, validations);
const controller = new CreateUserController(service);

export default controller;
