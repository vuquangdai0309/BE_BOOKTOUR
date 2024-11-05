const app = express();
import route from "./routers";
import express from "express";
import db from "../src/config/db";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
app.use(cookieParser()); // Để xử lý cookies
app.use('/uploads', express.static('uploads'));
app.use(
  cors({
    origin: "http://localhost:5173", // Địa chỉ frontend của bạn
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
route(app);
db.connection;

export const viteNodeApp = app;
