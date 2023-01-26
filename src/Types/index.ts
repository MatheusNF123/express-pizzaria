export type Pizza = {
  id: string;
  flavor: string;
  type: string;
  price: number;
  ingredients: string[];
  img: string;
};

export type User = {
  id?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  role: string;
  img: string;
}

export interface Login extends User {
  token: string;
}

export type OrdersPizzas = {
  id?: string;
  pizza: Pizza;
  size: string;
  border: boolean;
  quantity: number;
}

export type Order = {
  id: string;
  user: User;
  ordersPizzas: OrdersPizzas[];
  status: string;
  date: Date;
  totalPrice: number;
}