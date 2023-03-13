import { pick, map } from 'lodash';
import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { IPostDocument, PostModel } from '../models';
import { IPostController } from './types';
import CutShortError from '../helpers/cutshort-error';

export class PostController implements IPostController {
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let search = req.query.q;
      var queryRegEx = new RegExp(String(req.query.q), 'i');
      let find: any = [];

      // filter any user's posts if user id is passed
      if (req.query.user_id) {
        find.push({ user_id: new Types.ObjectId(String(req.query.user_id)) });
      } else {
        // else show logged in user's posts
        find.push({ user_id: new Types.ObjectId(req.body?._user?.id) });
      }

      // build search query if query is present
      if (search != undefined && search != '') {
        find.push({
          $or: [{ title: { $regex: queryRegEx } }, { description: { $regex: queryRegEx } }],
        });
      }

      const postList = await PostModel.find({
        $and: find,
      })
        .skip(req.body._page * req.body._limit)
        .limit(req.body._limit)
        .exec();

      return res.send({
        status: true,
        data: postList,
      });
    } catch (error) {
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await PostModel.create({
        user_id: req.body?._user?.id,
        title: req.body.title,
      });

      return res.send({
        status: true,
        data: pick(post, ['id', 'title', 'comments', 'created_at', 'updated_at']),
      });
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!Types.ObjectId.isValid(req.params.postId)) {
        throw new CutShortError('error.post-not-found', 'Could not update post', 404);
      }

      const post = await PostModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(req.params.postId),
          user_id: req.body?._user?.id,
        },
        {
          ...(req.body.title && { title: req.body.title }),
        },
        { new: true }
      )
        .select('-user_id')
        .exec();

      if (!post) throw new CutShortError('error.post-not-found', 'Could not update post', 404);

      return res.send({
        status: true,
        data: this.formatPost(post),
      });
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!Types.ObjectId.isValid(req.params.postId)) {
        throw new CutShortError('error.post-not-found', 'Could not delete todo', 404);
      }

      const deleteItem = await PostModel.findByIdAndDelete(req.params.postId);

      return res.send({
        status: !!deleteItem,
      });
    } catch (error) {
      return next(error);
    }
  };

  addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!Types.ObjectId.isValid(req.params.postId)) {
        throw new CutShortError('error.post-not-found', 'Could not add comment', 404);
      }

      const post = await PostModel.findByIdAndUpdate(
        req.params.postId,
        {
          $push: {
            comments: {
              comment: req.body.comment,
              user_id: req.body?._user?.id,
            },
          },
        },
        { new: true }
      );

      if (!post) throw new CutShortError('error.post-not-found', 'Could not update post', 404);

      return res.send({
        status: true,
        post: this.formatPost(post),
      });
    } catch (error) {
      return next(error);
    }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await PostModel.findByIdAndUpdate(
        req.params.postId,
        {
          $pull: {
            comments: {
              comment: req.body.comment,
              user_id: req.body?._user?.id,
            },
          },
        },
        { new: true }
      );

      if (!post) throw new CutShortError('error.post-not-found', 'Could not update post', 404);

      return res.send({
        status: true,
        post: this.formatPost(post),
      });
    } catch (error) {
      return next(error);
    }
  };

  private formatPost = (post: IPostDocument) => ({
    ...pick(post, ['id', 'title', 'user_id', 'created_at', 'updated_at']),
    comments: map(post.comments, (comment) => pick(comment, ['id', 'comment', 'user_id', 'created_at', 'updated_at'])),
  });
}
