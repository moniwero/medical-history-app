import { CircularProgress } from "@mui/material";
import "../styles/components/LoadingSpinner.scss";

export const LoadingSpinner = () => (
  <div className="loading-spinner">
    <CircularProgress />
  </div>
);

export default LoadingSpinner;
