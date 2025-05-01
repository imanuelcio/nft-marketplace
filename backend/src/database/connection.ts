import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import config from "../config/config";
dotenv.config();

export const supabase = createClient(
  config.supabase_url || "",
  config.supabase_key || ""
);
