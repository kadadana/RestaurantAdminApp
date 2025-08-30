import { MongoClient } from "mongodb";

const urlPrefix = "mongodb+srv://";
const urlSuffix = "@restaurantdbcluster.b2pmv4h.mongodb.net/" +
    + "?retryWrites=true&w=majority&appName=RestaurantDBCluster";
const urlUser = "kadadana";
const urlPasswd = process.env.restaurantDB_passwd;

const url = urlPrefix + urlUser + ":" + urlPasswd + urlSuffix;

console.log(url);

const client = new MongoClient(url);

let db;

export async function connectDB() {
    await client.connect();
    db = client.db("restaurant");
    console.log("MongoDB connection is OK.");
}

export function getDB() {
    if (!db) throw new Error("DB not initialized!");
    return db;
}