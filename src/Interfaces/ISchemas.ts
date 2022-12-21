export default interface ISchemas<T> {
  userSchema: T;
  userUpdateSchema: T;
  orderSchema: T;
  pizzaSchema: T;
  pizzaUpdateSchema: T;
}
