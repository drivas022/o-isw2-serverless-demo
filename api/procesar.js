export default function handler(req, res) {
  const nombre = req.query.nombre || "anónimo";

  res.status(200).json({
    resultado: `Nombre procesado: ${String(nombre).toUpperCase()}`,
    longitud: String(nombre).length
  });
}
