import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Categories() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase.from("results").select("*");
      if (error) throw error;
      setResults(data);
    };
    fetchResults();
  }, []);

  return (
    <div>
      {results.map((result) => (
        <div key={result.id}>
          <h3>{result.category}</h3>
          <p>{result.description}</p>
          <img src={`${supabase.storageUrl}/${result.image_url}`} alt={result.description} />
        </div>
      ))}
    </div>
  );
}

export default Categories;