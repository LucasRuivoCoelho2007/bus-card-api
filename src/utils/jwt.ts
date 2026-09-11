import { jwtVerify, SignJWT } from "jose";
import { env } from "../config/env.ts";
import throwlhosModule from "npm:throwlhos";

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
    throw throwlhosModule.default.err_unauthorized("Invalid token");
  }

  return payload.sub;
}