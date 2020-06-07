import React from "react";
import Grid from "@material-ui/core/Grid";
import DateSlider from "./DateSlider";
import DisplayNameTextField from "./DisplayNameTextField";
import Button from "@material-ui/core/Button";

export default function SearchCriteria({ setDisplayName, setStartDate, onSubmit }) {

  function handleSubmitClick(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form autoComplete="off">
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <DisplayNameTextField handleDisplayNameChange={setDisplayName} />
      </Grid>
      <Grid item>
        <DateSlider handleDateChange={setStartDate} />
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={handleSubmitClick} type="submit">
          Search
        </Button>
      </Grid>
    </Grid>
    </form>
  );
}
