import { useState } from "react";
import { supabase, uploadImage } from "../services/supabase";

function AddResult() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageData = await uploadImage(file);
      await supabase.from("results").insert({
        category,
        description,
        image_url: imageData.path,
      });
      alert("Result added successfully!");
    } catch (error) {
      alert("Error uploading result: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select category</option>
        <option value="usg">USG</option>
        <option value="rtg">RTG</option>
        <option value="blood-tests">Badania krwi</option>
        {/* ... inne opcje */}
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
  );
}

export default AddResult;