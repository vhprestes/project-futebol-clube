import { Request, Response, NextFunction } from 'express';

const isEmailValid = (email: string): boolean => {
  const regex = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/gim;
  const testRegex = regex.test(email);
  if (!testRegex) return false;
  return true;
};

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!isEmailValid(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    if (password.length < 6) {
      return res.status(422).json({
        message: '"password" length invalid',
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
