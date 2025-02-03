import { CircularProgress } from "@mui/material";
import "../styles/components/LoadingSpinner.scss";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <CircularProgress />
  </div>
);

export default LoadingSpinner;
