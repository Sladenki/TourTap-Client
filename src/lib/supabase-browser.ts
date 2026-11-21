import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://evitlpwbbuhagkcgogmt.supabase.co";
const supabasePublishableKey = "sb_publishable_G9dmzxLpMaREfbtKCsoNAg_KyTRPqLS";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
