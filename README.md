# MARSWalk — Boxwork Science EVA Planner

A web tool a Mars astronaut could use to plan science walks across the **boxwork terrain on Mount Sharp, Gale Crater**, built for the NASA Space Apps Challenge. It layers NASA data, plans a multi-stop route, and shows the safety information a crew needs before leaving the habitat.

## Science goal and location

- **Goal:** study the boxwork, a network of resistant ridges (~5 m wide) enclosing hollows 10–20 m across, thought to record groundwater flowing through rock cracks.
- **Location:** the boxwork region where Curiosity worked from sol 4534 (May 2025) to about sol 4844.
- **Why here:** Curiosity has driven this ground, so every route follows terrain a rover has already crossed. That is the app's safety prior for mobility.

## Features

| Feature | Description |
|---|---|
| Science stops | Four boxwork stops (contact with the sulfate unit, Altadena drill site, Nevado Sajama ridgetop, southern boundary), each with a science note. Custom stops can be added by clicking the track. |
| Multi-stop route | Tick, reorder and add stops, choose the base camp, and the planner builds out-and-back EVAs along the rover track. |
| Automatic EVA splitting | Stops that do not fit one EVA time limit are split across several EVAs. |
| Leg-by-leg table | Distance, time, max tilt, elevation change, arrival time, sun elevation, estimated temperature and radiation dose per leg. |
| Layered map | Topographic, optical and plan-view basemaps; track coloured by tilt or elevation; toggles for the boxwork path, stops and EVA routes. |
| Elevation profile | Climb along the track, coloured by tilt, with stops marked. |
| Crew settings | Solo, pair, or pair with rover assist; carried payload; start time; EVA limit; science time per stop. |
| Go / no-go checks | Duration, slope, daylight, space weather, sand-filled hollows, walk-back. |
| Live space-weather alert | Warns when a solar storm (CME) is forecast to reach Mars. |
| Mars clock | Local solar time, season (Ls) and sun elevation at Gale, live in the header. |
| Point-of-view photos | Rover images from the sol of the selected stop. |
| EVA protocols | Hazard cards driven by live data: solar storm, dust season, steep ground, low sun or cold, overlong EVA. |
| Environment tab | Atmosphere composition, radiation, sol timeline and dust-season note. |
| Connection test | One button in the Data & sources tab checks every NASA service and shows pass or fail. |

## NASA data used

### Fetched live from NASA services

| Data | Service / API | Used for |
|---|---|---|
| Curiosity drive history: position, elevation, rover tilt, sol | JPL MMGIS `https://mars.nasa.gov/mmgis-maps/MSL/Layers/json/MSL_waypoints.json` | Track, stop positions, slope, elevation profile |
| Topography (MGS MOLA colourised shaded relief) | NASA/JPL Mars Trek WMTS tiles, `https://trek.nasa.gov/tiles/Mars/EQ/` | Topographic basemap |
| Optical imagery (Viking MDIM 2.1 colour mosaic) | NASA/JPL Mars Trek WMTS tiles | Optical basemap |
| CME analyses with ENLIL arrival at Mars | NASA DONKI API, `https://api.nasa.gov/DONKI/CMEAnalysis` | Live space-weather alert |
| Rover photos by sol | NASA Mars Rover Photos API, `https://api.nasa.gov/mars-photos/api/v1/rovers/` | Point-of-view images |
| Curiosity boxwork images (fallback) | NASA Image and Video Library, `https://images-api.nasa.gov/search` | Fallback imagery |

### Embedded from NASA mission publications

| Value | Source |
|---|---|
| Surface radiation at Gale: 0.67 mSv/day dose equivalent, 0.210 ± 0.040 mGy/day absorbed; 1.8 mSv/day during cruise | Curiosity RAD, Hassler et al. 2014 (Science) |
| Atmosphere: CO₂ 95.1%, N₂ 2.59%, Ar 1.94%, O₂ 0.161%, CO 0.058% | Curiosity SAM, Trainer et al. 2019 |
| 2018 global dust storm reduced Gale's daily air-temperature range by 56 K | Curiosity REMS |
| Boxwork timeline and findings: sulfate-unit contact (sol 4534), phyllosilicates at Altadena (CheMin), Nevado Sajama drill (sols ~4714–4741), exit from the boxwork (~sol 4844); ridges ~5 m wide, hollows 10–20 m | NASA Curiosity mission blog, NASA Photojournal, GSA 2025 and LPSC 2025 abstracts |

### Computed by the app (models, not NASA measurements)

- **Mars clock:** local solar time, season and sun elevation from the Mars24 algorithm (Allison & McEwen, 2000), checked against the Curiosity landing (Ls 150.7).
- **Air temperature:** an assumed day-night curve between −80 °C and −5 °C. To be replaced with REMS or TES data.
- **Walking time:** 2.5 km/h walking speed × 0.6 pressure-suit factor, a Tobler slope penalty driven by rover tilt, and a 0.4% per kg payload penalty.
- **EVA dose:** the RAD daily rate scaled to EVA hours (baseline only; excludes suit shielding and solar storms).

### Not yet integrated (roadmap)

AI4MARS terrain labels (soil, bedrock, sand, big rock), MGS TES global temperature, and MER Pancam/Navcam products from data.nasa.gov. These are large archives and are not wired into the app yet. Obstacle detection is therefore not implemented: routes avoid hazards only by following ground Curiosity has already driven.

## Limitations

- Stops are matched to the nearest recorded Curiosity drive for the sol shown. Altadena, Nevado Sajama and the southern boundary use approximate sols, so positions are near those places rather than exact.
- The planner needs the live Curiosity traverse. If it cannot load, the app shows an error instead of inventing positions. A copy is cached in the browser after one successful load.
- Basemap tiles are ~460 m per pixel (MOLA), so very close zoom levels look blurry. The plan-view basemap avoids this.

## Tech stack

HTML, JavaScript, [Leaflet](https://leafletjs.com/) (map), [Tailwind CSS](https://tailwindcss.com/) (styling), and one Vercel serverless function (`api/nasa.js`) that relays NASA requests.


Repository Main Branch layout:

```
License        Exclusively Ownership
index.html     the app
api/nasa.js    serverless proxy for NASA requests
vercel.json    Vercel config
README.md      this file
```

## Credits

Data and imagery: NASA/JPL-Caltech, NASA CCMC, USGS/NASA Mars Trek, NASA Planetary Data System. This is built for NASA SPACE APPS 2026 by Team Xenon

## Team Xenon Details
### Sauda Rahman (Team Lead & Storyteller)
### Sumaiya Akter Fabia (Visionary & UI/UX Designer)
### Rafi Adnan (Full Stack Developer)
