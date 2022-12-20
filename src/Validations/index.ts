import { userSchema, orderSchema } from "./schemas";
import Validations from "./Validations";

export default new Validations({ userSchema, orderSchema });
