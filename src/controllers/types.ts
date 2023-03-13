import { Request, Response, NextFunction } from "express";

export interface IAuthController {
  signup: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
  login: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
  refresh: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
}

export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
};
