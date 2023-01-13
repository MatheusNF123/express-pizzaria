export default interface ISchemas<T> {
  userSchema: T;
  userLoginSchema: T;
  userUpdateSchema: T;
  orderSchema: T;
  cartSchema: T;
  pizzaSchema: T;
  pizzaUpdateSchema: T;
}
