import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined"; // Import ikony kosza

const DeleteButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation(); // Zapobiega otwieraniu obrazu przy kliknięciu na kosz
        onClick();
      }}
      className="delete-button"
      sx={{ color: "red" }} // Ustawienie koloru samej ikony
    >
      <DeleteIcon />
    </IconButton>
  );
};

// 📌 PropTypes dla walidacji propsów
DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
