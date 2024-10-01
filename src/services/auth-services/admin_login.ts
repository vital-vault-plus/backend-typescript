import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { isValidPassword } from "../../utils/password_validate";
import { signAccessToken, signRefreshToken } from "../../utils/jwt_helper";

export const adminLogin = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const existingAdmin = await prisma.organisation.findFirst({
    where: {
      userName,
    },
  });

  if (!existingAdmin) {
    return sendError(res, "Organisation not registered!!");
  }

  if (await isValidPassword(password, existingAdmin?.password!)) {
    const accessTokenPromise = signAccessToken(existingAdmin?.id);
    const refreshTokenPromise = signRefreshToken(existingAdmin?.id);

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return sendSuccess(res, { accessToken, refreshToken });
  } else {
    return sendError(res, "Invalid Credentials", 401);
  }
};
