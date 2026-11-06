import express from "express";
import {corsMiddleware} from "./middlewares/cors.js";
import {jobsRouter} from "./routes/jobs.js";
import { DEFAULTS } from "./config.js";

const port = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use('/jobs', jobsRouter);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server app listening on http://localhost:${port}`);
  });
}

export default app;