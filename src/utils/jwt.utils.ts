import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_SECRET as string;

export const generateToken = (payload: {
  id: number;
  email: string;
}): string => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err: any) {
    return null;
  }
};
