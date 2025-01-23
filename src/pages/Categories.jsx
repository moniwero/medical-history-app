import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Categories.scss";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    "TK",
    "RTG",
    "MRI",
    "Badania krwi",
    "Echo serca",
    "USG",
    "Inne",
  ];

  return (
    <div className="categories-container">
      <div className="categories-header">
        <Button
          variant="text"
          className="addresult-back-button"
          onClick={() => navigate("/dashboard")}
        >
          Wstecz
        </Button>
      </div>

      <h1 className="categories-title">Wybierz kategorię</h1>
      <div className="categories-list">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="contained"
            className="categories-button"
            onClick={() => navigate(`/results/${category}`)} // Przekierowanie do strony wyników
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
