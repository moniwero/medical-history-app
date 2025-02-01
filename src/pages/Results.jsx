import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import BackButton from "../components/BackButton";
import DeleteButton from "../components/DeleteButton";
import CustomModal from "../components/Modal";
import "../styles/Results.scss";

const Results = () => {
  const { category } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
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

    fetchResults();
  }, [category]);

  // 📤 Pobieranie publicznego URL przed otwarciem modala
  const handleOpenModal = async (imagePath) => {
    if (!imagePath) return;

    const { data } = supabase.storage.from("results").getPublicUrl(imagePath);
    setSelectedImage(data.publicUrl);
  };

  // 🗑 Usuwanie wyniku
  const handleDelete = async (resultId, imagePath) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten wynik?")) return;

    try {
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from("results")
          .remove([imagePath]);

        if (storageError) {
          console.error("❌ Błąd usuwania obrazu:", storageError.message);
        } else {
          console.log("✅ Obraz usunięty z Supabase Storage");
        }
      }

      // 🗄️ Usunięcie wpisu z bazy
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

  if (loading) {
    return (
      <div className="results-loading">
        <h2>Ładowanie...</h2>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <BackButton to="/categories" />
      </div>
      <h1>Wyniki dla kategorii: {category}</h1>
      <div className="results-list">
        {results.length > 0 ? (
          results.map((result) => (
            <div
              key={result.id}
              className="result-item"
              onClick={() => handleOpenModal(result.image_url)}
            >
              <p className="result-info">{result.description}</p>
              <div>
                <DeleteButton
                  onClick={() => handleDelete(result.id, result.image_url)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Brak wyników w tej kategorii.</p>
        )}
      </div>

      {/* 🖼 Modal ze zdjęciem */}
      <CustomModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <img src={selectedImage} alt="Wynik" className="modal-image" />
        )}
      </CustomModal>
    </div>
  );
};

export default Results;
