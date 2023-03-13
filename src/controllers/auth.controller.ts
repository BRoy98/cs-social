import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

import { UserModel } from '../models';
import { IAuthController } from './types';
import { TokenModel } from '../models/tokens.model';
import CutShortError from '../helpers/cutshort-error';
import { registerUserSession } from '../services/auth.service';

export class AuthController implements IAuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const saltRounds = 10;

      // hash password
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });

      // save user data
      const user = await UserModel.create({
        email: req.body.email,
        password: hashedPassword,
        full_name: req.body.full_name,
      });

      const sessionTokens = await registerUserSession(user);

      return res.send({
        success: true,
        data: sessionTokens,
      });
    } catch (error: any) {
      // if user already exists
      if (error.code === 11000) {
        return next(
          new CutShortError(
            'error.user-already-exist',
            'An user with this email already exists. Please login to continue.',
            401
          )
        );
      }
      return next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserModel.findOne({
        email: req.body.email,
      });

      if (!user || !bcrypt.compareSync(req.body.password, user?.password)) {
        throw new CutShortError(
          'error.invalid-email-password',
          'The email or password is incorrect.',
          401
        );
      }

      const sessionTokens = await registerUserSession(user);

      return res.send({
        success: true,
        data: sessionTokens,
      });
    } catch (error: any) {
      return next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await TokenModel.findOne({
        token: req.body.token,
      });

      const user = await UserModel.findById(token?.user_id);

      if (!user) {
        throw new CutShortError('error.invalid-session', 'Please login to continue.', 401);
      }

      const sessionTokens = await registerUserSession(user);

      return res.send({
        success: true,
        data: sessionTokens,
      });
    } catch (error: any) {
      return next(error);
    }
  }
}
