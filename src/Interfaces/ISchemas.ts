export default interface ISchemas<T> {
  userSchema: T;
  userLoginSchema: T;
  userUpdateSchema: T;
  saleInfoSchema: T;
  orderSchema: T;
  cartSchema: T;
  cartItemSchema: T;
  pizzaSchema: T;
  pizzaUpdateSchema: T;
}
