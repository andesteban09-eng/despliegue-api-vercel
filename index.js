import express from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";
import { randomUUID } from "crypto";
import cors from "cors";

const ACCEPTED_ORIGINS = ["http://localhost:5173"];

const port = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  return res.send({ status: "ok", uptime: process.uptime() });
});



app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
