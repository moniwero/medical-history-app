import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, uploadImage } from "../services/supabase";
import BackButton from "../components/BackButton";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import "../styles/AddResult.scss";

const AddResult = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // Dodany stan ładowania

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Rozpoczynamy ładowanie

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        alert("Musisz być zalogowany, aby dodać wynik!");
        setLoading(false);
        return;
      }

      const imagePath = await uploadImage(file);
      if (!imagePath) throw new Error("Błąd podczas przesyłania obrazu!");

      const { error } = await supabase.from("results").insert([
        {
          category,
          description,
          image_url: imagePath,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      alert("✅ Wynik dodany pomyślnie!");
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Błąd: " + error.message);
    } finally {
      setLoading(false); // Zakończenie ładowania
    }
  };

  return (
    <div className="addresult-container">
      <div className="addresult-header">
        <BackButton to="/dashboard" />
      </div>

      <Box component="form" onSubmit={handleSubmit} className="addresult-form">
        <input
          type="file"
          id="file-upload"
          className="file-input"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <label htmlFor="file-upload" className="file-label">
          Wybierz plik
        </label>
        {file && <span className="file-name">{file.name}</span>}

        <FormControl fullWidth className="file-select">
          <InputLabel>Kategoria</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="file-select"
          >
            <MenuItem value="">Wybierz kategorię</MenuItem>
            <MenuItem value="usg">USG</MenuItem>
            <MenuItem value="rtg">RTG</MenuItem>
            <MenuItem value="blood-tests">Badania krwi</MenuItem>
            <MenuItem value="tk">TK</MenuItem>
            <MenuItem value="mri">MRI</MenuItem>
            <MenuItem value="echo">ECHO SERCA</MenuItem>
            <MenuItem value="other">INNE</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Opis"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="text-field"
        />

        <Button
          className="button"
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Dodaj wynik"}
        </Button>
      </Box>
    </div>
  );
};

export default AddResult;
