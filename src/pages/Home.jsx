import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkUser, listenToAuthChanges, handleLogout } from "../services/user";
import LoadingPage from "../components/LoadingPage";
import "../styles/pages/Home.scss";
import HomeIlustration from "../assets/Home-img.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Funkcje w services/user.js !!
  useEffect(() => {
    // Sprawdź stan użytkownika po załadowaniu komponentu
    checkUser(setUser, setLoading);

    // Nasłuchuj zmian w stanie uwierzytelnienia
    const cleanup = listenToAuthChanges(setUser);

    // Sprzątanie przy odmontowywaniu komponentu
    return cleanup;
  }, []);

  // Funkcja obsługująca wylogowanie
  const handleLogoutClick = async () => {
    await handleLogout(setUser);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container">
      <div className="home-image">
        <img src={HomeIlustration} alt="Ilustracja Home" />
      </div>
      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title">Moja dokumentacja medyczna</h1>
          {user ? (
            <>
              <div className="user-info">
                <Link
                  component="button"
                  onClick={() => navigate("/dashboard")}
                  className="user-link"
                >
                  {user.email}
                </Link>
              </div>
              <Button
                variant="contained"
                className="button"
                onClick={handleLogoutClick}
              >
                Wyloguj
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              className="button"
              onClick={() => navigate("/login")}
            >
              Zaloguj
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
