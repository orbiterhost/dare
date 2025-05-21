import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse, Pledge, ServerBindings } from "shared/dist";
import { createClient } from "@supabase/supabase-js";

const app = new Hono<{ Bindings: ServerBindings }>();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/pledges", async (c) => {
  try {
    const supabase = createClient(
      c.env.SUPABASE_URL,
      c.env.SUPABASE_SERVICE_ROLE_KEY
    );

    let allPledges: any[] = [];
    let hasMore = true;
    let page = 1;

    while (hasMore) {
      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers({
        page: page,
        perPage: 1000,
      });

      if (error) {
        console.log(error);
        throw error;
      }

      allPledges = [...allPledges, ...users]
      if (users.length < 1000) {
        hasMore = false;
      } else {
        page = page + 1;
      }
    }

    return c.json({ data: allPledges });
  } catch (error) {
    console.log(error);
    return c.json({ message: "Server Error" }, 500);
  }
});


export default app;
