import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'url';
const supabaseKey = 'anon pub';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
