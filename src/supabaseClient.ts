import { createClient } from '@supabase/supabase-js';

// Estos valores los sacas de tu panel de Supabase
const supabaseUrl = 'https://xmruwwynelwrrtuqaojc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcnV3d3luZWx3cnJ0dXFhb2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMzY5ODUsImV4cCI6MjA5NDgxMjk4NX0.H8fkiGDaI_OBRcwVzMlkY7gImw0vH-cFsRz4HAboRY4';

export const supabase = createClient(supabaseUrl, supabaseKey);