import {
  userSchema,
  userLoginSchema,
  saleInfoSchema,
  userUpdateSchema,
  orderSchema,
  cartSchema,
  cartItemSchema,
  pizzaSchema,
  pizzaUpdateSchema,
} from "./schemas";
import Validations from "./Validations";

const schemas = {
  userSchema,
  userLoginSchema,
  userUpdateSchema,
  saleInfoSchema,
  orderSchema,
  cartSchema,
  cartItemSchema,
  pizzaSchema,
  pizzaUpdateSchema,
};

export default new Validations(schemas);
