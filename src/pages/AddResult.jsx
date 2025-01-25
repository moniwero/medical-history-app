import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, uploadImage } from "../services/supabase";
import "../styles/AddResult.scss";

const AddResult = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // Funkcja do obsługi wysyłania formularza
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Pobranie aktualnie zalogowanego użytkownika
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        alert("Musisz być zalogowany, aby dodać wynik!");
        return;
      }

      // Upload pliku
      const imageData = await uploadImage(file);

      console.log("🔍 Ścieżka do pliku po uploadzie:", imageData);
      console.log(
        "🔍 Ścieżka do obrazu przed zapisaniem do bazy:",
        imageData?.path
      );

      // Wstawienie rekordu do tabeli `results`
      const { error } = await supabase.from("results").insert([
        {
          category,
          description,
          image_url: imageData.path, //Zapisujemy ścieżkę do obrazu w bazie, ale z path jest NULL
          user_id: user.id, // Musi pasować do polityki RLS!!!!
        },
      ]);

      if (error) throw error;

      alert("Result added successfully!");
    } catch (error) {
      alert("Error uploading result: " + error.message);
    }
  };

  return (
    <div className="addresult-container">
      <div className="addresult-header">
        <Button
          variant="text"
          className="addresult-back-button"
          onClick={() => navigate("/dashboard")}
        >
          Wstecz
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="usg">USG</option>
          <option value="rtg">RTG</option>
          <option value="blood-tests">Badania krwi</option>
          <option value="tk">TK</option>
          <option value="mri">MRI</option>
          <option value="echo">ECHO SERCA</option>
          <option value="other">INNE</option>
        </select>
        <input
          type="text"
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Dodaj wynik</button>
      </form>
    </div>
  );
};

export default AddResult;
