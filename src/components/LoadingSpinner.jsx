import { CircularProgress } from "@mui/material";
import "../styles/LoadingSpinner.scss";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <CircularProgress />
  </div>
);

export default LoadingSpinner;
