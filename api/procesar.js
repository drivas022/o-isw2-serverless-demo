export default function handler(req, res) {
  const nombre = req.query.nombre || "anónimo";

  if (String(nombre).toLowerCase() === "error") {
    return res.status(500).json({
      error: "Fallo simulado en /api/procesar"
    });
  }

  res.status(200).json({
    resultado: `Nombre procesado: ${String(nombre).toUpperCase()}`,
    longitud: String(nombre).length
  });
}
