import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse, Pledge, ServerBindings } from 'shared/dist'
import { createPledge } from './db'
import { createClient } from '@supabase/supabase-js'

const app = new Hono<{ Bindings: ServerBindings }>()

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/pledges", async (c) => {

  const supabase = createClient(
    c.env.SUPABASE_URL,
    c.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase.from("pledges").select("*")

  if (error) {
    console.log(error)
    return c.json({ error: "Problem fetching pledges" }, { status: 500 })
  }

  return c.json(data as Pledge[])
})

app.post('/pledges', async (c) => {

  const token = c.req.header("X-Orbiter-Token");

  if (!token) {
    return c.json({ error: "Unauthenticated" }, { status: 401 })
  }

  try {

    const supabase = createClient(
      c.env.SUPABASE_URL,
      c.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    const pledge: Pledge = {
      user_id: "",
      email: "",
      display_name: "",
      avatar_url: ""
    }

    await createPledge(c, pledge)

    const data: ApiResponse = {
      message: "Pledge Stored!",
      success: true
    }
    return c.json(data, { status: 200 })
  } catch (error) {
    console.log(error)
    return c.json({ error: "Problem creating pledge" }, { status: 500 })
  }
})

export default app
