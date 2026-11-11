import { Router } from "express";
import { JobsController } from "../controllers/jobs.js";
import { validateJob, validateJobPartial } from "../schemmas/jobs.js";

export const jobsRouter = Router();
//CRUD: Create, Read, Update, Delete

function validateCreate(req, res, next) {
  const result = validateJob(req.body);
  if (result.success) {
    req.body = result.data;
    next();
  }
  return res
    .status(400)
    .json({ error: "solicitud inválida", details: result.error.errors });
}

function validateUpdate(req, res, next) {
  const result = validateJobPartial(req.body);
 if (!result.success) {
     return res.status(400).json({ error: "solicitud inválida", details: result.error.errors });
 }
 req.body = result.data;
 next();
}
jobsRouter.get("/", JobsController.getAll);

jobsRouter.get("/:id", JobsController.getById);

jobsRouter.post("/", validateCreate, JobsController.create);

//para reemplazar un recurso completo
jobsRouter.put("/:id", JobsController.update);

//para actualizar un recurso parcial
jobsRouter.patch("/:id", validateUpdate, JobsController.partialUpdate);

jobsRouter.delete("/:id", JobsController.delete);
