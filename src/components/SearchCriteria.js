import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateSlider from "./DateSlider";
import DisplayNameTextField from "./DisplayNameTextField";
import Button from "@material-ui/core/Button";

export default function SearchCriteria({ setDisplayName, setStartDate, onSubmit }) {

  const [disabledButton, setDisabledButton] = useState(true);

  function handleSubmitClick(event) {
    event.preventDefault();
    onSubmit();
  }

  function handleDisplayNameChange(displayName){
    setDisplayName(displayName);
    setDisabledButton(displayName === "");
  }

  return (
    <form autoComplete="off">
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <DisplayNameTextField handleDisplayNameChange={handleDisplayNameChange} />
      </Grid>
      <Grid item>
        <DateSlider handleDateChange={setStartDate} />
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={handleSubmitClick} type="submit" disabled={disabledButton}>
          Search
        </Button>
      </Grid>
    </Grid>
    </form>
  );
}
