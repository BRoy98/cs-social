import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo {
  user_id: string;
  title: string;
  description: string;
  complete: boolean;
}
export interface ITodoDocument extends ITodo, Document {}

const TodoSchema = new Schema(
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
      default: '',
    },
    complete: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export const TodoModel = mongoose.model<ITodoDocument>('todo', TodoSchema);
