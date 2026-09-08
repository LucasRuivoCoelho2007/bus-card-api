import { client } from "./config/database.ts";

const db = client.db(""); // Especificar o nome do banco de dados
const col = db.collection(""); //Especificar o nome da coleção

