import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import app from "./app.js";

let server;
const port = 3001;
const baseUrl = `http://localhost:${port}`;

before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => resolve());
    server.on("error", reject);
  });
});

after(async () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      resolve();
    });
  });
});

describe("GET /jobs", () => {
  test("debe responder con un estado 200 y un objeto JSON", async () => {
    const response = await fetch(`${baseUrl}/jobs`);
    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.strictEqual(
      typeof data,
      "object",
      "la respuesta debe ser un objeto",
    );
  });
});

test("debe filtrar trabajos por tecnología", async () => {
  const tech = "react";
  const response = await fetch(`${baseUrl}/jobs?technology=${tech}`);
  assert.strictEqual(response.status, 200);
  const data = await response.json();
  assert.ok(
    data.data.every(job => job.data.technology.includes(tech)),
    `Todos los trabajos deben incluir la tecnología ${tech}`,
  );
});
