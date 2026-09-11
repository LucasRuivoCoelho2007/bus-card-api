const jwtSecret = Deno.env.get("JWT_SECRET");
import throwlhosModule from "npm:throwlhos";

if (!jwtSecret) {
  throw throwlhosModule.default.err_badRequest("JWT_SECRET não definida no .env");
}

export const env = {
  jwtSecret,
};