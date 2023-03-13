import mongoose, { Document, Schema } from 'mongoose';

export interface IComment {
  user_id: string;
  comment: string;
}

export interface ICommentDocument extends IComment, Document {}

export interface IPost {
  user_id: string;
  title: string;
  description: string;
  comments: Array<ICommentDocument>;
}
export interface IPostDocument extends IPost, Document {}

const PostSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    comments: [
      {
        user_id: {
          type: Schema.Types.String,
          required: true,
        },
        comment: {
          type: Schema.Types.String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export const PostModel = mongoose.model<IPostDocument>('post', PostSchema);
