import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.scss";
import BackButton from "../components/BackButton";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <BackButton to="/" />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-image">
        </div>

        <div className="dashboard-buttons">
          <Button
            variant="contained"
            className="button"
            onClick={() => navigate("/categories")}
          >
            Wyniki
          </Button>
          <Button
            variant="contained"
            className="button"
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