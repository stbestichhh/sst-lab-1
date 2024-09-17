import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'
import { healthcheck } from './healthcheck';

const app = new Hono();

app.get('/', (c: Context) => {
  return c.text('Hello Stranger!');
});

app.get('/healthcheck', async (c: Context) => {
  return await healthcheck(c);
});

const port = Number(process.env.PORT) || 9110;
const host = 'localhost';
console.log(`Server is running on http://${host}:${port}`);

serve({
  fetch: app.fetch,
  port
})
