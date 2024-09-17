import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Stranger!');
})

const port = 9110;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
})
