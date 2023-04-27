import GetAllPizzasController from "../UseCases/PizzaUseCase/getAllPizzas/GetAllPizzasController";
import GetPizzaByIdController from "../UseCases/PizzaUseCase/getPizzaById/GetPizzaByIdController";

export default interface IPizzaControllers {
  getPizzaById: GetPizzaByIdController;
  getAllPizzas: GetAllPizzasController;
}
