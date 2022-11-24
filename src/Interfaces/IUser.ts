// export type IUserDTO = z.infer<typeof User>;

export interface ILogin{
  email: string;
  password: string;
}

export default interface IUser extends ILogin {
  id?: string;
  name: string;
  address: string;
  phone: string;
}


