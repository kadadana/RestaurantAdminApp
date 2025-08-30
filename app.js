import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/routes.js";
import { connectDB } from "./db.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/", routes);


connectDB().then(() => {
    app.listen(3000, () => console.log("Server is up on port 3000"));
    
}).catch(err => {
    console.error("DB connection error:", err);
});