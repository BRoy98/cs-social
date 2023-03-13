import mongoose, { Document, Schema } from 'mongoose';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  email: string;
  full_name: string;
  password: string;
  role: Role;
}
export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    full_name: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(Role),
      default: Role.USER,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export const UserModel = mongoose.model<IUserDocument>('user', UserSchema);
