import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.scss";
import HomeIlustration from "../assets/Home-img.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Button
          variant="text"
          className="dashboard-back-button"
          onClick={() => navigate("/")}
        >
          Wstecz
        </Button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-image">
          <img src={HomeIlustration} alt="Ilustracja Dashboard" />
        </div>

        <div className="dashboard-buttons">
          <Button
            variant="contained"
            className="dashboard-button"
            onClick={() => navigate("/categories")}
          >
            Wyniki
          </Button>
          <Button
            variant="contained"
            className="dashboard-button"
            onClick={() => navigate("/add-result")}
          >
            Dodaj wynik
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
