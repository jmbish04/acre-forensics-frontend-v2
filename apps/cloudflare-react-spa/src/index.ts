import { Hono } from 'hono';

type Bindings = {
  ASSETS: Fetcher;
}

const app = new Hono<{ Bindings: Bindings }>();

// API Routes
app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from the Cloudflare Worker!',
    timestamp: new Date().toISOString(),
  });
});

// Static Assets & SPA Fallback
app.get('*', async (c) => {
  const url = new URL(c.req.url);

  // 1. Try to fetch the exact asset requested
  let response = await c.env.ASSETS.fetch(c.req.raw);

  // 2. If not found (404) and it looks like a navigation request (no extension),
  //    serve index.html for Client-Side Routing.
  if (response.status === 404 && !url.pathname.includes('.')) {
    response = await c.env.ASSETS.fetch(new Request(url.origin + '/index.html', c.req.raw));
  }

  return response;
});

export default app;
