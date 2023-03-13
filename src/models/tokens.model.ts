import mongoose, { Document, Schema } from "mongoose";

export enum TokenType {
  SESSION = "SESSION",
}

export interface IToken {
  user_id: string;
  token: string;
  token_type: TokenType;
  session_created_at: Date;
}

export interface ITokenDocument extends IToken, Document {}

const TokenSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.String,
      required: true,
    },
    token: {
      type: Schema.Types.String,
      required: true,
    },
    token_type: {
      type: Schema.Types.String,
      enum: TokenType,
      required: true,
    },
    session_created_at: {
      type: Schema.Types.Date,
    },
  },
  { timestamps: true }
);

TokenSchema.index({ session_created_at: 1 }, { expireAfterSeconds: 2592000 }); // 30 days

export const TokenModel = mongoose.model<ITokenDocument>("tokens", TokenSchema);
