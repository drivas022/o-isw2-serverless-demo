export default function handler(req, res) {
  const { nombre } = req.query;

  // Manejo de error simulado
  if (String(nombre || "").toLowerCase() === "error") {
    return res.status(500).json({
      ok: false,
      error: "Error simulado en /api/procesar",
      timestamp: new Date().toISOString(),
    });
  }

  // Valor por defecto
  const nombreFinal = nombre || "Anónimo";
  const timestamp = new Date().toISOString();
  const resultado = `Nombre procesado: ${String(nombreFinal).trim().toUpperCase()}`;

  return res.status(200).json({
    ok: true,
    resultado,
    timestamp,
  });
}
