// index.js or server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import routes from "./routes/centerllize.route.js";

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api", routes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("server is running at port", PORT);
});
