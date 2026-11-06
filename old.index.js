import express from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.get("/", (req, res) => {
  return res.send({ message: "Hello World" });
});

app.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

// Opcional -> /acd o /abcd
app.get("/a{b}cd", (req, res) => {
  return res.send("abcd o acd");
});

// Comodín
app.get("/bb*bb", (req, res) => {
  return res.send("bb*bb");
});

// Rutas más largas que no sabes como terminan
app.get("/file/*filename", (req, res) => {
  return res.send("file/*");
});

// Usar Regex
app.get(/.*fly$/, (req, res) => {
  return res.send("Terminando en fly");
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
//una operacion es indenpotente si al hacerla un numero indiferente de veces da el mismo resultado, deja el sistema igual sin importar cuantas veces se haga, significa que sus operaciones se efectuan dentro de la operacion, por ejemplo post no es indenpotente, get siempre es indenpotente, put si, patch depende de los recursos que se modifiquen, puede ser indenpotente o no, delete si
