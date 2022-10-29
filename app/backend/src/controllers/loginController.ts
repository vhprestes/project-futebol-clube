import { Request, Response } from 'express';
import LoginService from '../services/loginService';
// import { IData } from '../interfaces/IData';

const loginService = new LoginService();

export default class LoginController {
  public login = async (req: Request, res: Response) => {
    const { message, code } = await loginService.login(req.body);
    console.log('token', message);
    if (code) return res.status(code).json({ message });
    // if (!message) return res.status(401).json({ message: 'Incorrect email or password' });
    return res.status(200).json({ token: message });
  };
  // comment

  public getRole = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    console.log('token', token);
    const role = await loginService.validate(token as string);
    console.log('role', role);
    return res.status(200).json({ role });
  };
}
