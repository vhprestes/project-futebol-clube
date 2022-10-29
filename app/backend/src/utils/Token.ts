import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
// import { IData } from '../interfaces/IData';
// import HttpException from '../middlewares/HttpExceptions';
// import { IData } from '../interfaces/IData';

const secret = process.env.JWT_SECRET || ('jwt_secret' as jwt.Secret);

export default class TokenManager {
  static makeToken = (payload: unknown) => {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  };

  static authenticateToken = async (token: string | undefined) => {
    if (!token) {
      return ({ code: 401, message: 'Token not found' });
    }
    const validateToken = jwt.verify(token, secret) as jwt.JwtPayload;
    console.log('validateToken AQUI MLK', validateToken);
    console.log('validatetoken 2222222222222222', validateToken.data.role);
    return validateToken.payload.data.role;
  };
}
