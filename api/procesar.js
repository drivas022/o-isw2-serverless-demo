export default function handler(req, res) {
  const { nombre } = req.query;

  if (!nombre) {
    return res.status(400).json({
      ok: false,
      error: "Falta el parámetro 'nombre'",
    });
  }

  if (String(nombre).toLowerCase() === "error") {
    return res.status(500).json({
      ok: false,
      error: "Error simulado en /api/procesar",
      timestamp: new Date().toISOString(),
    });
  }

  const timestamp = new Date().toISOString();
  const resultado = `Nombre procesado: ${String(nombre).trim().toUpperCase()}`;

  return res.status(200).json({
    ok: true,
    resultado,
    timestamp,
  });
}
