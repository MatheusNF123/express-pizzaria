export type Pizza = {
  id: string;
  flavor: string;
  type: string;
  price: number;
  ingredients: string[];
  img: string;
};

export type Login = {
  email: string;
  password: string;
}

export type User = {
  id?: string;
  name: string;
  address: string;
  phone: string;
  role: string;
  img: string;
  email: string;
  password: string;
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
  user: Omit<User, "password">;
  ordersPizzas: OrdersPizzas[]
  status: string;
  date: Date;
  totalPrice: number;
}