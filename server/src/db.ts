import { createClient } from "@supabase/supabase-js";
import type { Context } from "hono";
import type { Pledge } from "shared/dist";

export const createPledge = async (
  c: Context,
  pledge: Pledge
) => {
  try {
    const supabase = createClient(
      c.env.SUPABASE_URL,
      c.env.SUPABASE_SERVICE_ROLE_KEY
    );


    const { data, error } = await supabase
      .from("pledges")
      .upsert(pledge, { onConflict: "user_id" })
      .select();

    if (error) {
      throw error;
    }

  } catch (error) {
    console.log("site mapping error: ", error);
    throw error;
  }
};
