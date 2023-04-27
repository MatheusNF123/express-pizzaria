import { ICartPizzas } from "../Interfaces/ICartPizzas";
import { ISaleInfoDTO } from "../Interfaces/IOrder";

interface CheckDuplicateCartItemReturn {
  cartItem: ICartPizzas | null;
  quantity: number;
}

export default function checkDuplicateCartItem(
  cartPizzas: ICartPizzas[],
  saleInfo: ISaleInfoDTO,
): CheckDuplicateCartItemReturn {
  return cartPizzas.reduce((acc, curr) => {
    const { size, border, quantity, pizza } = curr;

    if (
      pizza.id === saleInfo.pizzaId &&
      size === saleInfo.size &&
      border === saleInfo.border) {
      return {
        cartItem: curr,
        quantity: quantity + saleInfo.quantity,
      }
    }

    return acc;
  }, {
    cartItem: null,
    quantity: 0,
  });
}
