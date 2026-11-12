# MARSWalk — Boxwork Science EVA Planner

NASA Space Apps Challenge entry. A map and planning tool for a Mars astronaut exploring the **boxwork terrain on Mount Sharp, Gale Crater**.

- Multi-stop science route (contact, Altadena, Nevado Sajama, southern boundary + custom stops), split into EVAs automatically
- Layers: MOLA topography, Viking optical, Curiosity track coloured by tilt/elevation, per-stop chemistry notes, radiation (RAD + live DONKI), computed sun/temperature
- Safety: go/no-go checks, live space-weather alert, hazard protocols

Live NASA sources: MMGIS Curiosity waypoints, Mars Trek tiles, DONKI, Mars Rover Photos API, NASA Image Library.

## Deploy
Static site + one serverless function. Push to GitHub, import in Vercel (Framework: Other).
Optional: add env var `NASA_API_KEY` (free at https://api.nasa.gov).
Open the **Data & sources** tab and press **Run test** to verify every connection.
