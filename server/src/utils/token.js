import jwt from "jsonwebtoken";

export const signToken = (id) => {
  const accessToken = jwt.sign(
    { id },
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES },
  );
  const refreshToken = jwt.sign(
    { id },
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES },
  );
  return { accessToken, refreshToken };
};

export const sendToken = (user) => {
  if (!user) return;
  const tokens = signToken(user._id);
  //create a cookie to store the accessToken

  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
    sameSite: isProduction ? "none" : "lax",
  };
  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    cookieOptions,
  };
};
