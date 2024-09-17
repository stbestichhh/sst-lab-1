import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Stranger!');
})

const port = 9110;
const host = 'localhost';
console.log(`Server is running on http://${host}:${port}`);

serve({
  fetch: app.fetch,
  port
})
