import { useEffect, useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../styles/Results.scss";

const Results = () => {
  const { category } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // Przechowuje pełny URL obrazka
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("results")
        .select("*")
        .ilike("category", category);

      if (error) {
        console.error("Błąd podczas pobierania wyników:", error.message);
      } else {
        setResults(data);
      }

      setLoading(false);
    };

    fetchResults();
  }, [category]);

  // Pobieranie publicznego URL obrazu przed otwarciem modala
  const handleOpenModal = async (imagePath) => {
    if (!imagePath) return;

    const { data } = supabase.storage.from("results").getPublicUrl(imagePath);
    setSelectedImage(data.publicUrl);
  };

  // Funkcja do usuwania wyniku (z bazy i Storage)
  const handleDelete = async (resultId, imageUrl) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten wynik?")) return;

    try {
      // Usunięcie pliku z Supabase Storage
      if (imageUrl) {
        const { data: storageData } = supabase.storage.from("results").getPublicUrl("");
        const baseUrl = storageData.publicUrl;
        const imagePath = imageUrl.replace(baseUrl, "").replace(/^\/+/, "");

        const { error: storageError } = await supabase.storage
          .from("results")
          .remove([imagePath]);

        if (storageError) {
          console.error("❌ Błąd usuwania obrazu:", storageError.message);
        } else {
          console.log("✅ Obraz usunięty z Supabase Storage");
        }
      }

      // Usunięcie wpisu z tabeli `results`
      const { error: dbError } = await supabase.from("results").delete().eq("id", resultId);

      if (dbError) {
        console.error("❌ Błąd usuwania rekordu z bazy:", dbError.message);
        return;
      } else {
        console.log("✅ Wpis usunięty z bazy danych");
      }

      // Aktualizacja widoku
      setResults((prevResults) => prevResults.filter((result) => result.id !== resultId));
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
        <Button variant="text" className="results-back-button" onClick={() => navigate("/categories")}>
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
              onClick={() => handleOpenModal(result.image_url)} // Pobiera publiczny URL przed otwarciem modala
            >
              <p>
                <strong>Opis:</strong> {result.description}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Zapobiega otwieraniu modala
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

      {/* Modal do wyświetlania obrazu */}
      <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <Box className="modal-box">
          <button className="close-modal" onClick={() => setSelectedImage(null)}>✖</button>
          {selectedImage && <img src={selectedImage} alt="Wynik" className="modal-image" />}
        </Box>
      </Modal>
    </div>
  );
};

export default Results;