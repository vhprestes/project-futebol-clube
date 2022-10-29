import bcrypt = require('bcryptjs');
import { ILogin } from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';
import TokenManager from '../utils/Token';
import validateToken from '../middlewares/authenticator';
import { ITokenLogin } from '../interfaces/ITokenLogin';
import { IReturnLogin } from '../interfaces/IReturnLogin';
// import HttpException from '../middlewares/HttpExceptions';

export default class LoginService {
  public login = async ({ email, password }: ILogin):Promise <ITokenLogin | IReturnLogin> => {
    console.log('email', email);
    const user = await UserModel.findOne({ where: { email } });
    console.log('user', user);
    if (!user) return ({ code: 401, message: 'Incorrect email or password' });

    const bcryptCheck = await bcrypt.compare(password, user.password);
    if (!bcryptCheck) return ({ code: 401, message: 'Incorrect email or password' });

    const token = TokenManager.makeToken(user);
    console.log('token', token);
    return { code: null, message: token };
  };

  public validate = (token:string) => {
    console.log('token validate service', token);
    const data = validateToken(token);
    console.log('data', data);
    return data.role;
  };
}
