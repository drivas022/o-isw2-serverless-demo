module.exports = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const nombre = (url.searchParams.get("nombre") || "").trim();

  // Esta función "conoce" al usuario (recibe el request del browser)
  if (!nombre) {
    return res.status(400).json({
      ok: false,
      error: "Falta el query param ?nombre=...",
      ejemplo: "/api/entrada?nombre=Juan",
    });
  }

  // Construimos base URL (sirve tanto en Vercel como local)
  const proto = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  const baseUrl = `${proto}://${host}`;

  const urlProcesar = `${baseUrl}/api/procesar?nombre=${encodeURIComponent(nombre)}`;

  try {
    console.log("[/api/entrada] Llamando a:", urlProcesar);

    const r = await fetch(urlProcesar, {
      headers: { accept: "application/json" },
    });

    if (!r.ok) {
      const text = await r.text();
      console.log("[/api/entrada] /api/procesar FALLÓ", r.status, text);

      // Resiliencia básica: devolver error claro
      return res.status(502).json({
        ok: false,
        error: "Falló el servicio /api/procesar",
        statusProcesar: r.status,
        detalle: text,
      });
    }

    const dataProcesada = await r.json();

    // Respuesta combinada
    return res.status(200).json({
      ok: true,
      quienConoceAlUsuario: "api/entrada",
      quienHaceElTrabajo: "api/procesar",
      entradaRecibio: { nombre },
      respuestaDeProcesar: dataProcesada,
      mensajeFinal: `Entrada recibió "${nombre}" y Procesar respondió: "${dataProcesada.mensaje}"`,
    });
  } catch (err) {
    console.log("[/api/entrada] Error inesperado:", err);

    return res.status(500).json({
      ok: false,
      error: "Error inesperado en /api/entrada",
    });
  }
};
