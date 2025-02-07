import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchResults,
  getPublicImageUrl,
  handleDelete,
  handleEdit,
} from "../services/result";
import BackButton from "../components/BackButton";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton"; // Import nowego komponentu
import CustomModal from "../components/Modal";
import LoadingPage from "../components/LoadingPage";
import "../styles/pages/Results.scss";

const Results = () => {
  const { category } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingDescription, setEditingDescription] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  // fetchResults w services/result.js
  useEffect(() => {
    // Pobieranie wyników dla danej kategorii i ustawia results
    fetchResults(category, setResults, setLoading);
  }, [category]);

  // Otwieranie modala z obrazem, getPublicImageUrl w services/result.js
  const handleOpenModal = async (imagePath) => {
    await getPublicImageUrl(imagePath, setSelectedImage);
  };

  // Obsługa usuwania wyniku, handleDelete w result.js
  const handleDeleteResult = async (resultId, imagePath) => {
    await handleDelete(resultId, imagePath, setResults);
  };

  // Obsługa edycji opisu, handleEdit w result.js
  const handleEditDescription = async (resultId) => {
    if (newDescription.trim() === "") {
      alert("Opis nie może być pusty!");
      return;
    }
    await handleEdit(resultId, newDescription, setResults);
    setEditingDescription(null); // Zamykanie trybu edycji
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
              {editingDescription === result.id ? (
                <div className="edit-description">
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Zapobiega otwieraniu obrazu przy kliknięciu na input
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Zapobiega otwieraniu obrazu
                      handleEditDescription(result.id);
                    }}
                  >
                    Zapisz
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Zapobiega otwieraniu obrazu
                      setEditingDescription(null);
                    }}
                  >
                    Anuluj
                  </button>
                </div>
              ) : (
                <p className="result-info">{result.description}</p>
              )}
              <div className="results-buttons">
                <EditButton
                  onClick={() => {
                    setEditingDescription(result.id);
                    setNewDescription(result.description);
                  }}
                />
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
