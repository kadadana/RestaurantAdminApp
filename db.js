import { MongoClient } from "mongodb";

const urlPrefix = "mongodb+srv://";
const urlSuffix = "@kadadana.c8zrumc.mongodb.net/"+
 "?retryWrites=true&w=majority&appName=kadadana";
const urlUser = "kadadana";
const urlPasswd = process.env.restaurantDB_passwd;

const url = urlPrefix + urlUser + ":" + urlPasswd + urlSuffix;

const client = new MongoClient(url);

let db;

export async function connectDB() {
    await client.connect();
    db = client.db("restaurantDB");
    console.log("MongoDB connection is OK.");
}

export function getDB() {
    if (!db) throw new Error("DB not initialized!");
    return db;
}