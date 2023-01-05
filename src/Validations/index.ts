import {
  userSchema,
  userLoginSchema,
  userUpdateSchema,
  orderSchema,
  pizzaSchema,
  pizzaUpdateSchema,
} from "./schemas";
import Validations from "./Validations";

const schemas = {
  userSchema,
  userLoginSchema,
  userUpdateSchema,
  orderSchema,
  pizzaSchema,
  pizzaUpdateSchema,
};

export default new Validations(schemas);
