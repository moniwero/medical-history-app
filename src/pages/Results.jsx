import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../styles/Results.scss";

const Results = () => {
  const { category } = useParams(); // Kategoria pobrana z URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("results")
        .select("*")
        .ilike("category", category); // Pobieranie wyników dla tej kategorii

      if (error) {
        console.error("Błąd podczas pobierania wyników:", error.message);
      } else {
        setResults(data);
      }

      setLoading(false);
    };

    fetchResults();
  }, [category]);

  // Funkcja do usuwania wyniku (z bazy i Storage)
  const handleDelete = async (resultId, imageUrl) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten wynik?")) return;

    try {
      //  Usunięcie pliku z Supabase Storage
      if (imageUrl) {
        // Pobieranie tylko ścieżki względnej (usuwamy bazowy URL)
        const { data: storageData } = supabase.storage
          .from("results")
          .getPublicUrl("");
        const baseUrl = storageData.publicUrl;

        const imagePath = imageUrl.replace(baseUrl, "").replace(/^\/+/, ""); // Usunięcie pierwszego `/`

        const { error: storageError } = await supabase.storage
          .from("results")
          .remove([imagePath]);

        if (storageError) {
          console.error("❌ Błąd usuwania obrazu:", storageError.message);
        } else {
          console.log("✅ Obraz usunięty z Supabase Storage");
        }
      }

      // 🗄️ 2. Usunięcie wpisu z tabeli `results`
      const { error: dbError } = await supabase
        .from("results")
        .delete()
        .eq("id", resultId);

      if (dbError) {
        console.error("❌ Błąd usuwania rekordu z bazy:", dbError.message);
        return;
      } else {
        console.log("✅ Wpis usunięty z bazy danych");
      }

      // 🔄 3. Aktualizacja widoku
      setResults((prevResults) =>
        prevResults.filter((result) => result.id !== resultId)
      );
    } catch (error) {
      console.error("❌ Błąd:", error.message);
    }
  };

  if (loading) {
    return <div className="results-loading">Ładowanie wyników...</div>;
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <Button
          variant="text"
          className="results-back-button"
          onClick={() => navigate("/categories")}
        >
          Wstecz
        </Button>
      </div>
      <h1 className="results-title">Wyniki dla kategorii: {category}</h1>
      <div className="results-list">
        {results.length > 0 ? (
          results.map((result) => (
            <div
              key={result.id}
              className="result-item"
              onClick={() =>
                navigate(`/details/${result.user_id}`, { state: { result } })
              }
            >
              <p>
                <strong>Opis:</strong> {result.description}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Zapobiega przejściu do szczegółów
                    handleDelete(result.id, result.image_url);
                  }}
                  className="delete-button"
                >
                  ❌
                </button>
              </p>
            </div>
          ))
        ) : (
          <p className="no-results">Brak wyników w tej kategorii.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
