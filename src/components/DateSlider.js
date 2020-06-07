import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import moment from "moment";

function valuetext(value) {
  return `${value}`;
}

export default function DateSlider({ handleDateChange }) {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    var startDate = null;
    switch (newValue) {
      case 1:
        startDate = moment().subtract(1, "years");
        break;
      case 2:
        startDate = moment().subtract(1, "months");
        break;
      case 3:
        startDate = moment().subtract(7, "days");
        break;
      default:
        startDate = moment(0);
    }
    handleDateChange(startDate);
  };

  const marks = [
    {
      value: 0,
      label: "All Time",
    },
    {
      value: 1,
      label: "Last Year",
    },
    {
      value: 2,
      label: "Last Month",
    },
    {
      value: 3,
      label: "Last Week",
    },
  ];

  return (
    <Box ml={5} mr={5}>
      <Box mb={-1}>
        <Typography id="continuous-slider" gutterBottom>
          Date Range
        </Typography>
      </Box>
      <Box width={300}>
        <Slider
          width="10%"
          value={value}
          onChange={handleChange}
          defaultValue={2}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="off"
          step={null}
          marks={marks}
          min={0}
          max={3}
          track={false}
        />
      </Box>
    </Box>
  );
}
