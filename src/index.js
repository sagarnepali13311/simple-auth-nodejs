import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Hello world");
});
app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
