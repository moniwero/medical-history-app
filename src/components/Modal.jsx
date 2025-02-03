import PropTypes from "prop-types";
import { Modal, Box } from "@mui/material";
import "../styles/components/Modal.scss";

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="modal-box">
        <button className="close-modal" onClick={onClose}>
          ✖
        </button>
        <div className="modal-content">{children}</div>
      </Box>
    </Modal>
  );
};

// Typowanie PropTypes
CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node, // children jest opcjonalne
};

export default CustomModal;
