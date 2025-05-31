import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edavtsxbgvtrmczwdpkp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYXZ0c3hiZ3Z0cm1jendkcGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDQ4MTgsImV4cCI6MjA2NDIyMDgxOH0.82C2AKC-05i5c5fecz8_-n2G6VFce2ht12SAi4MRB4Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 