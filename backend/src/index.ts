import express from "express";
const app = express();
import dotenv from "dotenv";
import { dbConnect } from "./config/database";
import { WebSocketServer } from "ws";
import authRouter from "./routes/auth";
import scoreRouter from "./routes/scoreboardRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = Number(process.env.PORT);
dbConnect();

export const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Connection in ws ");

  ws.on("close", () => {
    console.log("Disconneted in ws");
  });
});

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Auth Routes
app.use("/api/auth", authRouter);
app.use("/api/score", scoreRouter);

const server = app.listen(PORT, () => {
  console.log("Server up and running");
});

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});
