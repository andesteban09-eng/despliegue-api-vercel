import { JobModel } from "../models/jobs.js";
import { DEFAULTS } from "../config.js";
export class JobsController {
  static async getAll(req, res) {
    try {
      const {
        text,
        title,
        level,
        limit = DEFAULTS.LIMIT_PAGINATION,
        technology,
        offset = DEFAULTS.LIMIT_OFFSET,
      } = req.query;

      const result = await JobModel.getAll({
        text,
        title,
        level,
        limit,
        technology,
        offset,
      });

      return res.json(result);
    } catch (error) {
      console.error("Error en JobsController.getAll:", error);

      return res.status(500).json({
        message: "Error al obtener los empleos",
      });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    const job = await JobModel.getById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.json(job);
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, descripcion, data } = req.body;
    const newJob = await JobModel.create({
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
    });
    return res.status(201).json(newJob);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { titulo, empresa, ubicacion, descripcion, data } = req.body;
    const job = await JobModel.update(id, {
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.json(job);
  }
  static async partialUpdate(req, res) {
    const { id } = req.params;
    const { titulo, empresa, ubicacion, descripcion, data } = req.body;
    const job = await JobModel.partialUpdate(id, {
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.json(job);
  }
  static async delete(req, res) {
    const { id } = req.params;
    const jobIndex = jobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) {
      return res.sendStatus(404);
    }
    jobs.splice(jobIndex, 1);
    return res.sendStatus(204);
  }
}
