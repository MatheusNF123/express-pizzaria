export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin {
  id?: string;
  name: string;
  address: string;
  phone: string;
  role: string;
}

export interface ILoginReturn extends Omit<IUser, "password"> {
  token: string;
}
