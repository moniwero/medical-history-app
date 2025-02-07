import { supabase } from "./supabase";
import { uploadImage } from "./supabase";

// Dodawanie wyniku, użycie w AddResult.jsx
export const addResult = async (
  file,
  category,
  description,
  setLoading,
  navigate
) => {
  setLoading(true); // Rozpoczęcie ładowania

  try {
    // Sprawdzenie, czy użytkownik jest zalogowany
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      alert("Musisz być zalogowany, aby dodać wynik!");
      setLoading(false);
      return;
    }

    // Przesłanie obrazu, uploadImage w supabase.js
    const imagePath = await uploadImage(file);
    if (!imagePath)
      throw new Error(
        "Błąd podczas przesyłania obrazu! Dozwolone pliki jpg, jpeg, png."
      );

    const { error } = await supabase.from("results").insert([
      {
        category,
        description,
        image_url: imagePath,
        user_id: user.id,
      },
    ]);

    if (error) throw error;

    alert("✅ Wynik dodany pomyślnie!");
    navigate("/dashboard");
  } catch (error) {
    alert("❌ Błąd: " + error.message);
  } finally {
    setLoading(false);
  }
};

// Pobieranie wyników dla danej kategorii, uzyte w Results.jsx
export const fetchResults = async (category, setResults, setLoading) => {
  setLoading(true);
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .ilike("category", category);

  if (error) {
    console.error("❌ Błąd pobierania wyników:", error.message);
  } else {
    setResults(data);
  }

  setLoading(false);
};

// Pobieranie publicznego URL obrazu przed otwarciem modala, uzycie w Results.jsx
export const getPublicImageUrl = async (imagePath, setSelectedImage) => {
  if (!imagePath) return;
  const { data } = supabase.storage.from("results").getPublicUrl(imagePath);
  setSelectedImage(data.publicUrl);
};

// Usuwanie wyniku, uzycie w Results.jsx
export const handleDelete = async (resultId, imagePath, setResults) => {
  if (!window.confirm("Czy na pewno chcesz usunąć ten wynik?")) return;

  try {
    if (imagePath) {
      const { error: storageError } = await supabase.storage
        .from("results")
        .remove([imagePath]);
      if (storageError) throw storageError;
      console.log("✅ Obraz usunięty z Supabase Storage");
    }

    // Usunięcie wpisu z bazy
    const { error: dbError } = await supabase
      .from("results")
      .delete()
      .eq("id", resultId);
    if (dbError) throw dbError;

    console.log("✅ Wpis usunięty");
    setResults((prevResults) => prevResults.filter((r) => r.id !== resultId));
  } catch (error) {
    console.error("❌ Błąd:", error.message);
  }
};

// Edycja opisu wyniku, uzycie w Results.jsx
export const handleEdit = async (resultId, newDescription, setResults) => {
  try {
    const { error } = await supabase
      .from("results")
      .update({ description: newDescription })
      .eq("id", resultId);

    if (error) throw error;

    console.log("✅ Opis zaktualizowany");
    setResults((prevResults) =>
      prevResults.map((result) =>
        result.id === resultId
          ? { ...result, description: newDescription }
          : result
      )
    );
  } catch (error) {
    console.error("❌ Błąd:", error.message);
  }
};
