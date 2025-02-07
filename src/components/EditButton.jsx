import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation(); // Zapobiega otwieraniu obrazu przy kliknięciu na ikonę edycji
        onClick();
      }}
      className="edit-button"
      sx={{ color: "#0099ff" }}
    >
      <EditIcon />
    </IconButton>
  );
};

// Walidacja propsów
EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;