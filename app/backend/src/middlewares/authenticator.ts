import * as jwt from 'jsonwebtoken';
import 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const validateToken = (token: string) => {
  console.log('validate Token authenticator', token);
  const checkToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  console.log('checkToken AAAAAAAAAAAA', checkToken);
  return (checkToken.data);
};

export default validateToken;
