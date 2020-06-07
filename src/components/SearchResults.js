import React from "react";
import StatsTable from "./StatsTable";
import CharacterCard from "./CharacterCard";
import Box from "@material-ui/core/Box";

export default function SearchResults({ statistics }) {
  return (
    <Box>
      <Box>
        <StatsTable stats={statistics.stats} />
      </Box>
      {statistics.characters.map((character) => (
        <Box>
          {<CharacterCard input={character} />}
          {<StatsTable stats={character.stats} />}
        </Box>
      ))}
    </Box>
  );
}
