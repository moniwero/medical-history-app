// KLUCZ:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdWxjYnl3cGhqZXdlbmFsbmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3OTYwODgsImV4cCI6MjA1MjM3MjA4OH0.zLSUvcFNCzehoUizP-R9w5X8EFmJlV7cZEnD6X9vr3E

// URL:
// https://iqulcbywphjewenalnex.supabase.co

import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

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
  if (!file) return null;

  // Pobranie aktualnie zalogowanego użytkownika
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("❌ Błąd: Nie można pobrać użytkownika!");
    return null;
  }

  // Generowanie unikalnej nazwy pliku
  const fileExtension = file.name.split(".").pop(); // np. jpg, png
  const uniqueFileName = `${user.id}-${uuidv4()}.${fileExtension}`;
  const filePath = `images/${uniqueFileName}`;

  // Upload pliku
  const { error } = await supabase.storage
    .from("results")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("❌ Błąd uploadu:", error.message);
    return null;
  }

  return filePath; // Zwraca ścieżkę do zapisanego pliku
};
