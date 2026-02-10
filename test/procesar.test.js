import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/procesar.js";

function makeRes() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
}

test("procesar convierte el nombre a mayúsculas", () => {
  const req = { query: { nombre: "juan" } };
  const res = makeRes();

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    resultado: "Nombre procesado: JUAN",
    longitud: 4
  });
});

test("procesar maneja nombre ausente", () => {
  const req = { query: {} };
  const res = makeRes();

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(res.body.resultado.includes("ANÓNIMO"));
  assert.equal(res.body.longitud, 7);
});

test("procesar maneja nombre vacío", () => {
  const req = { query: { nombre: "" } };
  const res = makeRes();

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(res.body.resultado.includes("ANÓNIMO"));
  assert.equal(res.body.longitud, 7);
});

/**
 * Reto 3 — Política mínima de calidad
 * Regla: el contrato JSON debe ser consistente:
 * - Debe tener SOLO las llaves: resultado y longitud
 * - resultado debe iniciar con "Nombre procesado: "
 * - longitud debe ser un número
 */
test("procesar cumple contrato minimo de calidad (estructura JSON)", () => {
  const req = { query: { nombre: "Diego" } };
  const res = makeRes();

  handler(req, res);

  assert.equal(res.statusCode, 200);

  // 1) Debe tener exactamente esas llaves (ni más, ni menos)
  const keys = Object.keys(res.body).sort();
  assert.deepEqual(keys, ["longitud", "resultado"]);

  // 2) Formato del resultado
  assert.ok(res.body.resultado.startsWith("Nombre procesado: "));

  // 3) Tipos correctos
  assert.equal(typeof res.body.longitud, "number");
});
