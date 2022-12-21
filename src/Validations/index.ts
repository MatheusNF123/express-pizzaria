import {
  userSchema,
  userUpdateSchema,
  orderSchema,
  pizzaSchema,
  pizzaUpdateSchema,
} from "./schemas";
import Validations from "./Validations";

const schemas = {
  userSchema,
  userUpdateSchema,
  orderSchema,
  pizzaSchema,
  pizzaUpdateSchema,
};

export default new Validations(schemas);
