import React, { useState } from "react";
import { API } from "aws-amplify";
import SearchCriteria from "./SearchCriteria.js";
import SearchResults from "./SearchResults.js";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import CircularProgress from "./CircularProgress";

export default function StatsForm() {
  
  const [displayName, setDisplayName] = useState("");
  const [startDate, setStartDate] = useState(moment().subtract(1, "months"));
  const [isLoading, setIsLoading] = useState(false);
  const [statistics, setStatistics] = useState(null);

  async function getStatsFromAPI() {
    console.log("displayName=" + displayName);
    console.log("startDate=" + startDate.format("DD/MM/yyyy"));

    setIsLoading(true);

    const searchParams = {
      queryStringParameters: {
        membershipType: "2",
        displayName: displayName,
      },
    };

    await API.get("stats", "/search", searchParams)
      .then((searchResponse) => {
        const statsParams = {
          queryStringParameters: {
            membershipType: "2",
            membershipId: searchResponse[0].membershipId,
            startDate: startDate.toISOString(),
          },
        };
        API.get("stats", "/get", statsParams)
          .then((response) => {
            console.log(response);
            setStatistics(response);
          })
          .catch((e) => {
            console.error(e.message);
            setStatistics("");
          })
          .then(() => {
            setIsLoading(false);
          });
      })
      .catch((e) => {
        console.error(e.message);
        setIsLoading(false);
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
      <Grid item xs={12}>
        <Paper>{statistics && <SearchResults statistics={statistics} />}</Paper>
      </Grid>
    </Grid>
  );
}
