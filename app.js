import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { jobsRouter } from "./routes/jobs.js";
import { DEFAULTS } from "./config.js";

const port = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use("/jobs", jobsRouter);
app.get("/", (req, res) => {
  res.json({ message: "API de empleos funcionando" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server app listening on http://localhost:${port}`);
  });
}

export default app;
