import React, { useState } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import StatsTable from "./StatsTable";
import { useFormFields } from "../libs/hooksLib";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StatsForm.css";

export default function StatsForm({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({ name: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return fields.name.length > 0 && fields.name.length <= 100;
  }

  function handleDateChange(date) {
    setStartDate(date);
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    console.log(startDate);

    const searchParams = {
      // OPTIONAL
      queryStringParameters: {
        // OPTIONAL
        membershipType: "2",
        displayName: fields.name,
      },
    };

    await API.get("stats", "/search", searchParams)
      .then((searchResponse) => {
        console.log(searchResponse);
        console.log("startDate=" + startDate);

        const statsParams = {
          // OPTIONAL
          queryStringParameters: {
            // OPTIONAL
            membershipType: "2",
            membershipId: searchResponse[0].membershipId,
            startDate: startDate.toISOString(),
          },
        };
        console.log(statsParams);
        API.get("stats", "/get", statsParams)
          .then((response) => {
            console.log("THEN");
            setStatistics(response);
            console.log("THEN 2");
            
          })
          .catch((e) => {
            console.log("ERROR");
            console.error(e.message);
            console.log("ERROR 2");
            setStatistics("");
          })
          .then(() => {

            console.log("FINALLY");
            

            setIsProcessing(false);
            isLoading = false;
          });
      }).catch((e) => {
        console.error(e.message);
        setIsProcessing(false);
        isLoading = false;
      });

      
    }

  return (
    <form className="BillingForm" onSubmit={handleSubmitClick}>
      <FormGroup bsSize="large" controlId="name">
        <ControlLabel>PSN/Gamertag</ControlLabel>
        <FormControl type="text" value={fields.name} onChange={handleFieldChange} placeholder="PSN/Gamertag" />
        <ControlLabel>Date of earliest game used</ControlLabel>
      </FormGroup>
      <DatePicker dateFormat = "dd/MM/yyyy" selected={startDate} onChange={handleDateChange} />
      <LoaderButton block="true" type="submit" bsSize="large" isLoading={isProcessing} disabled={!validateForm()}>
        Submit
      </LoaderButton>
      <div>
      {statistics && <StatsTable stats={statistics.stats}/>}
      </div>
      {statistics && statistics.characters.map(character => (
        <div>
          {character.destinyClass}
          {<StatsTable stats={character.stats}/>}
        </div>
      ))}
    </form>
  );
}
