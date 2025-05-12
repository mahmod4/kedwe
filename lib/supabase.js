// lib/supabase.js
// استيراد createClient من حزمة npm بدلاً من CDN
import { createClient } from '@supabase/supabase-js';

// قيم Supabase من ملف .env.local
// في بيئة الإنتاج، يجب استخدام متغيرات بيئية
// في بيئة التطوير، نستخدم القيم مباشرة للتبسيط
// لكن يفضل استخدام متغيرات بيئية دائماً
const SUPABASE_URL = 'https://lxjdljiddqyhpufquwik.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4amRsamlkZHF5aHB1ZnF1d2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MzU0MzUsImV4cCI6MjA2MjIxMTQzNX0.Q0KpDTZA_j4hAUUVxqdeXhGc0nYAUK7WN4vjcMPM9gk';

// ملاحظة: في بيئة حقيقية، يجب استخدام المتغيرات البيئية كالتالي:
// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);