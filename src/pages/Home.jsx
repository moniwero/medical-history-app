import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/Home.scss";
import HomeIlustration from "../assets/Home-img.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funkcja do weryfikacji stanu użytkownika
  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      setUser(session.user); // Ustawienie użytkownika
    } else {
      // Próbuj odświeżyć sesję, jeśli jej nie ma
      const { data: refreshedSession, error } =
        await supabase.auth.refreshSession();
      if (refreshedSession) {
        setUser(refreshedSession.user);
      } else {
        console.error("Nie udało się odświeżyć sesji:", error);
        setUser(null);
      }
    }

    setLoading(false); // Koniec ładowania
  };

  useEffect(() => {
    // Pierwsze sprawdzenie użytkownika
    checkUser();

    // Nasłuchiwanie zmian w stanie użytkownika
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Sprzątanie po nasłuchiwaniu
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login"); // Przeniesienie na stronę logowania
  };

  if (loading) {
    return (
      <div className="home-loading">
        <h2>Ładowanie...</h2>
      </div>
    );
  }

  return (
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
                onClick={handleLogout}
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
