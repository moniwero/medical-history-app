import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to = -1, label = "Wstecz" }) => {
  const navigate = useNavigate();

  return (
    <Button variant="text" onClick={() => navigate(to)}>
      {label}
    </Button>
  );
};

BackButton.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
};

export default BackButton;
