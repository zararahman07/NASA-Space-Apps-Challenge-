// Vercel serverless proxy: lets the browser reach NASA services without CORS/rate-limit problems.
// Optional: set NASA_API_KEY in Vercel > Settings > Environment Variables (free key at https://api.nasa.gov)
const ALLOW = ['mars.nasa.gov', 'science.nasa.gov', 'api.nasa.gov', 'images-api.nasa.gov', 'kauai.ccmc.gsfc.nasa.gov'];

module.exports = async (req, res) => {
  try {
    const u = new URL(req.query.u);
    if (u.protocol !== 'https:' || !ALLOW.includes(u.hostname)) return res.status(400).json({ error: 'host not allowed' });
    if (u.hostname === 'api.nasa.gov' && process.env.NASA_API_KEY) u.searchParams.set('api_key', process.env.NASA_API_KEY);

    const r = await fetch(u, { headers: { 'User-Agent': 'MARSWalk/1.0', Accept: 'application/json' } });
    let body = await r.text();

    // Keep waypoint files small: newest 1000 drives, only the fields the app uses
    if (r.ok && /waypoints/i.test(u.pathname)) {
      const j = JSON.parse(body), arr = j.features || j;
      const keep = ['sol', 'drive', 'lat', 'lon', 'elev_geoid', 'elev_radii', 'tilt'];
      const slim = arr.slice().sort((a, b) => ((a.properties || a).sol - (b.properties || b).sol))
        .slice(-1000).map(f => {
          const p = f.properties || f, o = {};
          keep.forEach(k => { if (p[k] !== undefined) o[k] = p[k]; });
          return f.properties ? { type: 'Feature', geometry: f.geometry, properties: o } : o;
        });
      body = JSON.stringify(j.features ? { type: 'FeatureCollection', features: slim } : slim);
    }
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', r.headers.get('content-type') || 'application/json');
    return res.status(r.status).send(body);
  } catch (e) {
    return res.status(502).json({ error: String(e) });
  }
};
