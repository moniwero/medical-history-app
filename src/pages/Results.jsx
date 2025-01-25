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
