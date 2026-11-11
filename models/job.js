import jobs from "../jobs.json" with { type: "json" };
import { DEFAULTS } from "../config.js";
import { randomUUID } from "node:crypto";

export class JobModel {
  static async getAll({
    text,
    title,
    level,
    limit = DEFAULTS.LIMIT_PAGINATION,
    technology,
    offset = DEFAULTS.LIMIT_OFFSET,
  }) {
    let filteredJobs = jobs;

    if (text) {
      const searchTerm = text.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.titulo.toLowerCase().includes(searchTerm) ||
          job.descripcion.toLowerCase().includes(searchTerm),
      );
    }
    if (technology) {
      filteredJobs = filteredJobs.filter(
        (job) => job.data.technology === technology,
      );
    }
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);
    const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      offsetNumber + limitNumber,
    );
    return {
      data: paginatedJobs,
      total: filteredJobs.length,
      limit: limitNumber,
      offset: offsetNumber,
    };
  }

  static async getById(id) {
    const job = jobs.find((job) => job.id === id);
    return job;
  }
  static async create({ titulo, empresa, ubicacion, descripcion, data }) {
    const newJob = {
      id: randomUUID(),
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
    };
    jobs.push(newJob);
    return newJob;
  }

  static async update(id, { titulo, empresa, ubicacion, descripcion, data }) {
    const job = jobs.find((job) => job.id === id);
    if (!job) return null;
    job.titulo = titulo;
    job.empresa = empresa;
    job.ubicacion = ubicacion;
    job.descripcion = descripcion;
    job.data = data;
    return job;
  }
  static async partialUpdate(
    id,
    { titulo, empresa, ubicacion, descripcion, data },
  ) {
    const job = jobs.find((job) => job.id === id);
    if (!job) return null;
    if (titulo !== undefined) {
      job.titulo = titulo;
    }
    if (empresa !== undefined) {
      job.empresa = empresa;
    }
    if (ubicacion !== undefined) {
      job.ubicacion = ubicacion;
    }
    if (descripcion !== undefined) {
      job.descripcion = descripcion;
    }
    if (data !== undefined) {
      job.data = data;
    }
    return job;
  }

  static async delete(id) {
    const jobIndex = jobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) {
      return false;
    }
    jobs.splice(jobIndex, 1);
    return true;
  }
}
