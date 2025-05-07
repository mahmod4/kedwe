// lib/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// قيم Supabase من ملف .env.local
const SUPABASE_URL = 'https://lxjdljiddqyhpufquwik.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4amRsamlkZHF5aHB1ZnF1d2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MzU0MzUsImV4cCI6MjA2MjIxMTQzNX0.Q0KpDTZA_j4hAUUVxqdeXhGc0nYAUK7WN4vjcMPM9gk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);