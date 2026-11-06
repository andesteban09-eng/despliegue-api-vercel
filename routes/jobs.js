import { Router } from "express";
import { JobsController } from "../controllers/jobs.js";
export const jobsRouter = Router();
//CRUD: Create, Read, Update, Delete
jobsRouter.get("/", JobsController.getAll);

jobsRouter.get("/:id", JobsController.getById);

jobsRouter.post("/", JobsController.create);

//para reemplazar un recurso completo
jobsRouter.put("/:id", JobsController.update);

//para actualizar un recurso parcial
jobsRouter.patch("/:id", JobsController.partialUpdate);

jobsRouter.delete("/:id", JobsController.delete);


