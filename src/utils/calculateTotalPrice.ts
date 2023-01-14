import { ISaleInfo } from "../Interfaces/IOrder";
import IPizza from "../Interfaces/IPizza";

export default function calculateTotalPrice(saleInfo: ISaleInfo[], pizzas: IPizza[]) {

  const totalPrice = saleInfo.reduce((acc, curr, i) => {
    let price = pizzas[i].price;

    if (curr.border) price + 10;

    switch (curr.size) {
      case "small":
        price -= 8;
        break;
      case "big":
        price += 15;
        break;
      default:
        break;
    }

    return price * curr.quantity + acc;
  }, 0);

  return totalPrice;
}