import { swaggerSpec } from "../src/docs/swagger.ts";

await Deno.writeTextFile(
  "./openapi.json",
  JSON.stringify(swaggerSpec, null, 2),
);

console.log("openapi.json gerado com sucesso!");