import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_APP_API_URL;
const supabaseKey = import.meta.env.VITE_APP_API_KEY;
// const supabaseUrl = "https://zqkkvnxfdxshpvyzzdzi.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxa2t2bnhmZHhzaHB2eXp6ZHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwNDc2MjAsImV4cCI6MTk5MzYyMzYyMH0.eKIc8mnzAOBxTh8-fpyMFjrmfH5BzNrwtcuuHEzuceo";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;