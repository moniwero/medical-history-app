import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { TextField, Button } from "@mui/material";
import "../styles/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginOrRegister = async () => {
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Wprowadź poprawny adres email.");
      return;
    }

    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków.");
      return;
    }

    try {
      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        console.error("Login error:", loginError.message);

        if (loginError.message === "Invalid login credentials") {
          const { data: signUpData, error: signUpError } =
            await supabase.auth.signUp({
              email,
              password,
            });

          if (signUpError) {
            setError(signUpError.message);
            console.error("Sign-up error:", signUpError.message);
          } else {
            console.log(
              "Zarejestrowano i zalogowano użytkownika:",
              signUpData.user
            );
            navigate("/dashboard");
          }
        } else {
          setError(
            "Wystąpił błąd logowania. Sprawdź swoje dane i spróbuj ponownie."
          );
        }
      } else {
        console.log("Użytkownik zalogowany:", loginData.user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Nieoczekiwany błąd:", err.message);
      setError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
    }
  };

  return (
    <div className="login-container">
      <h1>Logowanie</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TextField
        className="login-input"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        className="login-input"
        label="Hasło"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        className="button"
        onClick={handleLoginOrRegister}
      >
        Zaloguj
      </Button>
      <p className="login-info">
        Pierwsze logowanie jest również rejestracją. Zapamiętaj hasło!
      </p>
    </div>
  );
};

export default Login;
