import { client } from "./config/database.ts";

const db = client.db("bus-card"); 
const cards = db.collection("cards"); 
const users = db.collection("users");
const transactions = db.collection("transactions");


