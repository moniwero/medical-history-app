import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CategorySelect = ({ value, onChange }) => {
  return (
    <FormControl fullWidth className="file-select">
      <InputLabel>Kategoria</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        required
        className="file-select"
        sx={{ color: "white" }}
      >
        <MenuItem value="">Wybierz kategorię</MenuItem>
        <MenuItem value="usg">USG</MenuItem>
        <MenuItem value="rtg">RTG</MenuItem>
        <MenuItem value="blood-tests">Badania krwi</MenuItem>
        <MenuItem value="tk">TK</MenuItem>
        <MenuItem value="mri">MRI</MenuItem>
        <MenuItem value="echo">ECHO SERCA</MenuItem>
        <MenuItem value="other">INNE</MenuItem>
      </Select>
    </FormControl>
  );
};

// Walidacja propsów
CategorySelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategorySelect;
