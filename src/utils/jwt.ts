import { jwtVerify, SignJWT } from "jose";
import { env } from "../config/env.ts";

const secret = new TextEncoder().encode(env.jwtSecret);

export async function generateToken(userId: string): Promise<string> {
  return await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<string> {
  const { payload } = await jwtVerify(token, secret);

  if (!payload.sub) {
    throw new Error("Token does not contain a user ID");
  }

  return payload.sub;
}