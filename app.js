import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";
import session from "express-session";

import productRouter from "./routes/adminRoutes.js";
import authRouter from "./routes/authRoutes.js";
import menuRouter from "./routes/menuRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: process.env.restaurantSESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

app.use(menuRouter);
app.use(authRouter)
app.use(productRouter);

connectDB().then(() => {
  app.listen(3000, () => console.log("Server is up on port 3000"));
  console.log("Click for admin side: " + "http://localhost:3000/");
  console.log("Click for customer side: " + "http://localhost:3000/menu");

}).catch(err => {
  console.error("DB connection error:", err);
});