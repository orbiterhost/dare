import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://jaxropjugoyuflpkinhg.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpheHJvcGp1Z295dWZscGtpbmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NTE5MjQsImV4cCI6MjA2MzQyNzkyNH0.J9SdgQWbQLg3CoyaGrmoWrImqBVCG6GfasEbBgPMACk";

export const supabase = createClient(PROJECT_URL, ANON_KEY);
