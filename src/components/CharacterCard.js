import React from "react";
import "./CharacterCard.css";
import Box from "@material-ui/core/Box";

export default function CustomizedTables(input) {
  console.log("input = " + JSON.stringify(input));
  console.log("emblem = " + input.input.emblem);

  var source = "https://www." + input.input.emblem;

  return (
    <Box mt={1} mb={1}>
      <div class="card-container">
        <img src={source} alt="Emblem" />
        <div class="destiny-class">{input.input.destinyClass}</div>
        <Box justify="right" class="destiny-light">{input.input.light}</Box>
        <div class="destiny-race-gender">{input.input.destinyRace + " " + input.input.destinyGender}</div>
      </div>
    </Box>
  );
}
