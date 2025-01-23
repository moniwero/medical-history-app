// KLUCZ:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdWxjYnl3cGhqZXdlbmFsbmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3OTYwODgsImV4cCI6MjA1MjM3MjA4OH0.zLSUvcFNCzehoUizP-R9w5X8EFmJlV7cZEnD6X9vr3E

// URL:
// https://iqulcbywphjewenalnex.supabase.co

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iqulcbywphjewenalnex.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdWxjYnl3cGhqZXdlbmFsbmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3OTYwODgsImV4cCI6MjA1MjM3MjA4OH0.zLSUvcFNCzehoUizP-R9w5X8EFmJlV7cZEnD6X9vr3E";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export const uploadImage = async (file) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  const { data, error } = await supabase.storage
    .from("results")
    .upload(`images/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;
  return data.path; // Zwraca ścieżkę do zapisanego pliku
};
