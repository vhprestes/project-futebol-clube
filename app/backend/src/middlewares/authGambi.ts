import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const validation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log('token', token);
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    console.log('decoded', decoded);
    next();
    return decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validation;
