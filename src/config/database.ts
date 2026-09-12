import mongoose from "npm:mongoose";

const uri = Deno.env.get("ATLAS_URI");

if (!uri) {
  throw new Error("ATLAS_URI não definida");
}

try {
  await mongoose.connect(uri, {
    dbName: "bus-card",
  });

  console.log("Conectado ao MongoDB Atlas");
} catch (error) {
  console.error("Erro ao conectar ao MongoDB Atlas:", error);
  Deno.exit(1);
}

export default mongoose;