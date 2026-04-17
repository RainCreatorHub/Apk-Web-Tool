import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://hlxctwnlwvoyyntptoxk.supabase.co';
const supabaseKey = 'anon pub';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
