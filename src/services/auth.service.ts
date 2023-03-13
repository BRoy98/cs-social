import { DateTime } from "luxon";
import * as JWT from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { toInteger } from "lodash";
import { IUserDocument } from "../models";
import { TokenModel, TokenType } from "../models/tokens.model";

export const registerUserSession = async (user: IUserDocument) => {
  const jwt_secret = process.env.NX_JWT_SECRET || "secret-token";

  const session = await TokenModel.create({
    user_id: user.id,
    token: uuidv4(),
    token_type: TokenType.SESSION,
    session_created_at: DateTime.now().toISO(),
  });

  const accessToken = JWT.sign(
    {
      iss: process.env.TOKEN_ISSUER || "Cutshort",
      sub: `${user.email}`,
      payload: {
        role: user.role,
      },
      iat: parseInt((new Date().getTime() / 1000).toFixed(0)),
      exp: parseInt(
        DateTime.local()
          .plus({
            seconds: toInteger(process.env.ACCESS_TOKEN_TTL) || 1 * 60 * 60,
          })
          .toSeconds()
          .toString(),
        10
      ),
    },
    jwt_secret
  );

  return {
    access_token: accessToken,
    refresh_token: session.token,
  };
};
