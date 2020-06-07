import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

export default function DisplayNameTextField({ handleDisplayNameChange }) {
  
  const handleChange = (event) => {
    event.preventDefault();
    handleDisplayNameChange(event.target.value);
  };

  return (
    <Box>
      <TextField required id="standard-required" label="PSN/Gamertag" defaultValue="" onChange={handleChange} />
    </Box>
  );
}
