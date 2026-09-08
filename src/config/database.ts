import { MongoClient } from "npm:mongodb";

const uri = Deno.env.get("ATLAS_URI");

if (!uri) {
  console.error("ATLAS_URI não definida no .env");
  Deno.exit(1);
}

const client = new MongoClient(uri);

await client.connect();
console.log("Conectado ao MongoDB Atlas");

export { client };   