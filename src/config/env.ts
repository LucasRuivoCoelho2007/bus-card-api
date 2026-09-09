const jwtSecret = Deno.env.get("JWT_SECRET");

if (!jwtSecret) {
  throw new Error("JWT_SECRET não definida no .env");
}

export const env = {
  jwtSecret,
};