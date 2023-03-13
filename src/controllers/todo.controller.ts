import { pick } from 'lodash';
import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ITodoController } from './types';
import { TodoModel } from '../models/todos.model';
import CutShortError from '../helpers/cutshort-error';

export class TodoController implements ITodoController {
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let search = req.query.q;
      var queryRegEx = new RegExp(String(req.query.q), 'i');

      let find: any = [{ user_id: new Types.ObjectId(req.body?._user?.id) }];

      // build search query if query is present
      if (search != undefined && search != '') {
        find.push({
          $or: [{ title: { $regex: queryRegEx } }, { description: { $regex: queryRegEx } }],
        });
      }

      const todoList = await TodoModel.find({
        $and: find,
      })
        .select('-user_id')
        .skip(req.body._page * req.body._limit)
        .limit(req.body._limit)
        .exec();

      return res.send({
        status: true,
        data: todoList,
      });
    } catch (error) {
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await TodoModel.create({
        user_id: req.body?._user?.id,
        title: req.body.title,
        description: req.body.description,
      });

      return res.send({
        status: true,
        data: pick(todo, ['id', 'title', 'description', 'complete']),
      });
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await TodoModel.findByIdAndUpdate(
        req.params.todoId,
        {
          ...(req.body.title && { title: req.body.title }),
          ...(req.body.description && { description: req.body.description }),
          ...(req.body.complete && { complete: req.body.complete }),
        },
        { new: true }
      )
        .select('-user_id')
        .exec();

      return res.send({
        status: true,
        data: todo,
      });
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!Types.ObjectId.isValid(req.params.todoId)) {
        throw new CutShortError('error.not-found', 'Could not update todo', 404);
      }

      await TodoModel.findByIdAndDelete(req.params.todoId);

      return res.send({
        status: true,
      });
    } catch (error) {
      return next(error);
    }
  };
}
