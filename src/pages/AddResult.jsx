import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addResult } from "../services/result";
import BackButton from "../components/BackButton";
import LoadingSpinner from "../components/LoadingSpinner";
import CategorySelect from "../components/CategorySelect";
import { Button, TextField, Box } from "@mui/material";
import "../styles/pages/AddResult.scss";

const AddResult = () => {
  const [file, setFile] = useState(null); // plik
  const [category, setCategory] = useState(""); //kategoria
  const [description, setDescription] = useState(""); // opis
  const [loading, setLoading] = useState(false); // Stan ładowania

  const navigate = useNavigate();

  // addResult w services/result.js
  const handleSubmit = async (e) => {
    e.preventDefault(); //Zapobiega domyślnemu odświeżeniu strony
    await addResult(file, category, description, setLoading, navigate);
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
        <label htmlFor="file-upload" className="file-label" required>
          Wybierz plik
        </label>
        {file && <span className="file-name">{file.name}</span>}

        <CategorySelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

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
