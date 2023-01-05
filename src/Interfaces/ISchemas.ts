export default interface ISchemas<T> {
  userSchema: T;
  userLoginSchema: T;
  userUpdateSchema: T;
  orderSchema: T;
  pizzaSchema: T;
  pizzaUpdateSchema: T;
}
