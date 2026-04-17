import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://hlxctwnlwvoyyntptoxk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhseGN0d25sd3ZveXludHB0b3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzODU1NDQsImV4cCI6MjA5MTk2MTU0NH0.qJiyP8lZHSI5WFqrgAcrOYKzdlE8LYwnT0pgMEIR0y0';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
