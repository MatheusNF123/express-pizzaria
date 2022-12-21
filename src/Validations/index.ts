import { userSchema, orderSchema, pizzaSchema } from "./schemas";
import Validations from "./Validations";

export default new Validations({ userSchema, orderSchema, pizzaSchema });
