export interface ILogin {
  email: string,
  password: string,
}

export interface IUser extends ILogin {
  role: string,
  username: string,
  id?:number
}
