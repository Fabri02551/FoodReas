// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://droigvzfsatgqnlyqouo.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyb2lndnpmc2F0Z3FubHlxb3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzMzc1MDgsImV4cCI6MjAzNDkxMzUwOH0.NXDsZqG5c8gKT2ql-7Njop_u4Wgbl64S4LH4Xol5XRo'; // Reemplaza con tu clave de API
export const supabase = createClient(supabaseUrl, supabaseKey);
