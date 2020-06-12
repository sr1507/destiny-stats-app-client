import React, { useState } from "react";
import { API } from "aws-amplify";
import SearchCriteria from "./SearchCriteria.js";
import SearchResults from "./SearchResults.js";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import CircularProgress from "./CircularProgress";
import MuiAlert from "@material-ui/lab/Alert";

export default function StatsForm() {
  const [displayName, setDisplayName] = useState("");
  const [startDate, setStartDate] = useState(moment().subtract(1, "months"));
  const [isLoading, setIsLoading] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  async function getStatsFromAPI() {
    setStatistics(null);
    setIsLoading(true);

    const searchParams = {
      queryStringParameters: {
        membershipType: "2",
        displayName: displayName,
      },
    };

    await API.get("stats", "/search", searchParams)
      .then((searchResponse) => {
        if (searchResponse.length === 0) {
          setErrorMessage("Player not found");
          setOpenSnackbar(true);
          setIsLoading(false);
        } else {
          const statsParams = {
            queryStringParameters: {
              membershipType: "2",
              membershipId: searchResponse[0].membershipId,
              startDate: startDate.toISOString(),
            },
          };
          API.get("stats", "/get", statsParams)
            .then((response) => {
              setStatistics(response);
            })
            .catch((e) => {
              console.error(e.message);
              setStatistics("");
              setErrorMessage("Unexpected error has occurred");
              setOpenSnackbar(true);
            })
            .then(() => {
              setIsLoading(false);
            });
        }
      })
      .catch((e) => {
        console.error(e.message);
        setIsLoading(false);
        setErrorMessage("Unexpected error has occurred");
        setOpenSnackbar(true);
      });
  }

  return (
    <Grid container justify="center" direction="column" alignItems="center" spacing={4}>
      <Grid item xs={12}>
        <Paper>
          <SearchCriteria setDisplayName={setDisplayName} setStartDate={setStartDate} onSubmit={getStatsFromAPI} />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        {isLoading && <CircularProgress />}
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Paper>{statistics && <SearchResults statistics={statistics} />}</Paper>
      </Grid>
    </Grid>
  );
}
