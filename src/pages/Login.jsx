import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { handleLoginOrRegister } from "../services/user";
import "../styles/pages/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Funkcja w services/user.js
  const handleSubmit = async () => {
    await handleLoginOrRegister(email, password, setError, navigate);
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

      <Button variant="contained" className="button" onClick={handleSubmit}>
        Zaloguj
      </Button>
      <p className="login-info">
        Pierwsze logowanie jest również rejestracją. Zapamiętaj hasło!
      </p>
    </div>
  );
};

export default Login;
