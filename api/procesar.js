module.exports = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const nombre = (url.searchParams.get("nombre") || "").trim();

  const timestamp = new Date().toISOString();

  // Mini-reto: simular error si nombre = "error"
  if (nombre.toLowerCase() === "error") {
    console.log("[/api/procesar] Simulando error. nombre=error");
    return res.status(500).json({
      ok: false,
      error: "Error simulado en /api/procesar",
      timestamp,
    });
  }

  // "Trabajo" / lógica de negocio simulada
  const mensajeProcesado = `Hola ${nombre || "desconocido"}, ya procesé tu nombre ✅`;

  console.log("[/api/procesar] OK", { nombre, timestamp });

  return res.status(200).json({
    ok: true,
    nombre,
    mensaje: mensajeProcesado,
    timestamp,
  });
};
