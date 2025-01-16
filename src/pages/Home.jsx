import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Home.scss";
import HomeIlustration from "../assets/Home-img.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title">Moja dokumentacja medyczna</h1>
          <Button
            variant="contained"
            className="home-button"
            onClick={() => navigate("/login")}
          >
            Zaloguj
          </Button>
        </div>
        <div className="home-image">
          <img src={HomeIlustration} alt="Ilustracja Home" />
        </div>
      </div>
    </div>
  );
};

export default Home;
