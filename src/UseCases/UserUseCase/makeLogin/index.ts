// import MongooseUserRepository from "../../../Repository/implementations/MongooseUser.repository";
import MakeLoginService from "./MakeLoginService";
import MakeLoginController from "./MakeLoginController"


const mongooseUserRepository = new MongooseUserRepository()
const makeLoginService = new MakeLoginService(mongooseUserRepository)
const makeLoginController = new MakeLoginController(makeLoginService)

export default makeLoginController