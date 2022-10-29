import { Request } from 'express';

export interface INewRequest extends Request {
  userRole?: string,
}
