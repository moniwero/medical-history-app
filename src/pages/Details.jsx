import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../styles/Details.scss";

const Details = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [result, setResult] = useState(location.state?.result || null);
  const [imgPath, setImgPath] = useState(null);

  useEffect(() => {
    const getImg = async () => {
      const { data: imgData } = supabase.storage
        .from("results")
        .getPublicUrl(result.image_url); //path to storage img
      setImgPath(imgData.publicUrl);
      console.log(imgData, "id");
    };
    if (!result) {
      const fetchResult = async () => {
        const { data, error } = await supabase
          .from("results")
          .select("*")
          .eq("user_id", user_id)
          .single();

        const { data: imgData } = supabase.storage
          .from("results")
          .getPublicUrl(data.image_url);
        setImgPath(imgData.publicUrl);

        if (error) {
          console.error("Błąd podczas pobierania szczegółów:", error.message);
        } else {
          setResult(data);
        }
      };

      fetchResult();
      getImg();
      return;
    }
    getImg();
  }, [user_id, result]);

  if (!result) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="details-container">
      <div className="details-header">
        <button onClick={() => navigate(-1)}>Wstecz</button>
      </div>
      <h1>{result.description}</h1>
      {imgPath && (
        <img src={imgPath} alt="Wynik" className="result-image-detail" />
      )}
      <p>
        <strong>Testowy tekst</strong> {result.category}
      </p>
    </div>
  );
};

export default Details;
