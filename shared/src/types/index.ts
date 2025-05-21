export type ApiResponse = {
  message: string;
  success: true;
}

export type Pledge = {
  user_id: string;
  email: string;
  display_name: string;
  avatar_url: string;
}

export type ServerBindings = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}
