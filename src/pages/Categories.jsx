import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../styles/pages/Categories.scss";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { label: "USG", value: "usg" },
    { label: "RTG", value: "rtg" },
    { label: "Badania krwi", value: "blood-tests" },
    { label: "TK", value: "tk" },
    { label: "MRI", value: "mri" },
    { label: "ECHO SERCA", value: "echo" },
    { label: "INNE", value: "other" },
  ];

  return (
    <div className="categories-container">
      <div className="categories-header">
        <BackButton to="/dashboard" />
      </div>
      <h1 className="categories-title">Wybierz kategorię</h1>
      <div className="categories-list">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant="contained"
            className="button"
            onClick={() => navigate(`/results/${category.value}`)}
          >
            {category.label}{" "}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
