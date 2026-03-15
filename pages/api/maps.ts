import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({ error: "Faltan parámetros: origin y destination" });
    }

    // Llamada a la API de Google Maps Directions
    const response = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
      params: {
        origin,
        destination,
        key: GOOGLE_MAPS_API_KEY,
        mode: "driving",
      },
    });

    const data = response.data;

    if (data.status !== "OK") {
      return res.status(400).json({ error: "Error en Google Maps", details: data.status });
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    return res.status(200).json({
      distance: leg.distance.text,
      duration: leg.duration.text,
      startAddress: leg.start_address,
      endAddress: leg.end_address,
      steps: leg.steps.map((s: any) => ({
        instruction: s.html_instructions,
        distance: s.distance.text,
        duration: s.duration.text,
      })),
    });
  } catch (error) {
    console.error("Error en /api/maps:", error);
    return res.status(500).json({ error: "Error al calcular ruta" });
  }
}
