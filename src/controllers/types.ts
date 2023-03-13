import { Request, Response, NextFunction } from 'express';

export interface IAuthController {
  signup: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  login: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  refresh: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}

export interface ITodoController {
  list: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  create: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  update: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  delete: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}

export interface IPostController {
  list: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  create: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  update: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  delete: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  addComment: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  deleteComment: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}
