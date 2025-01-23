import { Button } from "@mui/material";
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
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null); // Ustawia użytkownika, jeśli jest zalogowany
    setLoading(false); // Koniec ładowania
  };

  useEffect(() => {
    // Pierwsze sprawdzenie użytkownika
    checkUser();

    // Nasłuchiwanie zmian w stanie użytkownika
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

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
      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title">Moja dokumentacja medyczna</h1>
          {user ? (
            <Button
              variant="contained"
              className="home-button"
              onClick={handleLogout}
            >
              Wyloguj
            </Button>
          ) : (
            <Button
              variant="contained"
              className="home-button"
              onClick={() => navigate("/login")}
            >
              Zaloguj
            </Button>
          )}
        </div>
        <div className="home-image">
          <img src={HomeIlustration} alt="Ilustracja Home" />
        </div>
      </div>
    </div>
  );
};

export default Home;