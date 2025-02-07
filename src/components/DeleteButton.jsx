import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const DeleteButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation(); // Zapobiega otwieraniu obrazu przy kliknięciu na kosz
        onClick();
      }}
      className="delete-button"
      sx={{ color: "red" }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

// Walidacja propsów
DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
