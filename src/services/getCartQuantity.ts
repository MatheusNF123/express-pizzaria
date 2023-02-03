import verifyCookie from "./verifyCookie";
import { getRequest } from "./api";
import { Cart } from "../Types";
import setApiHeaders from "./setApiHeaders";

export default async function getCartQuantity(): Promise<number> {
  if (!verifyCookie()) return 0;

  setApiHeaders();
  const { data, status } = await getRequest<Cart>("/cart");

  if (status !== 200) return 0;

  return data.cartPizzas.length;
}
