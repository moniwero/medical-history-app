import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchResults,
  getPublicImageUrl,
  handleDelete,
} from "../services/result";
import BackButton from "../components/BackButton";
import DeleteButton from "../components/DeleteButton";
import CustomModal from "../components/Modal";
import LoadingPage from "../components/LoadingPage";
import "../styles/pages/Results.scss";

const Results = () => {
  const { category } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Funkcje w services/result.js
  useEffect(() => {
    // Pobieranie wyników dla danej kategorii
    fetchResults(category, setResults, setLoading);
  }, [category]);

  // Otwieranie modala z obrazem
  const handleOpenModal = async (imagePath) => {
    await getPublicImageUrl(imagePath, setSelectedImage);
  };

  // Obsługa usuwania wyniku
  const handleDeleteResult = async (resultId, imagePath) => {
    await handleDelete(resultId, imagePath, setResults);
  };

  return loading ? (
    <LoadingPage />
  ) : (
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
              <div className="delete-button">
                <DeleteButton
                  onClick={() =>
                    handleDeleteResult(result.id, result.image_url)
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Brak wyników w tej kategorii.</p>
        )}
      </div>

      {/* Modal ze zdjęciem */}
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
