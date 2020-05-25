import React, {useState} from "react";
import {API} from "aws-amplify";
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import StatsDisplay from "./StatsDisplay";
import {useFormFields} from "../libs/hooksLib";
import "./StatsForm.css";

export default function StatsForm({
  isLoading,
  onSubmit,
  ...props
}) {
  const [fields, handleFieldChange] = useFormFields({name: ""});
  const [isProcessing, setIsProcessing] = useState(false);
  const [statistics, setStatistics] = useState(null);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return fields.name.length > 0 && fields.name.length <= 100;
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    const searchParams = { // OPTIONAL
      queryStringParameters: { // OPTIONAL
        membershipType: '2',
        displayName: fields.name
      }
    };
  
    API.get("stats", "/search", searchParams).then(searchResponse => {
      console.log(searchResponse);

      const statsParams = { // OPTIONAL
        queryStringParameters: { // OPTIONAL
          membershipType: '2',
          membershipId: searchResponse[0].membershipId
        }
      };

      API.get("stats", "/get", statsParams).then(response => {
        setStatistics(response);
      }).catch(e => {
        console.error(e.message);
        setStatistics("");
      }).then(() => {
        setIsProcessing(false);
          isLoading = false;
      });

    }).catch(e => {
      console.error(e.message);
      setIsProcessing(false);
      isLoading = false;
    });
  }

  return (<form className="BillingForm" onSubmit={handleSubmitClick}>
    <FormGroup bsSize="large" controlId="name">
      <ControlLabel>PSN/Gamertag</ControlLabel>
      <FormControl type="text" value={fields.name} onChange={handleFieldChange} placeholder="PSN/Gamertag"/>
    </FormGroup>
    <LoaderButton block="true" type="submit" bsSize="large" isLoading={isProcessing} disabled={!validateForm()}>
      Submit
    </LoaderButton>
    {statistics && <StatsDisplay stats={statistics}/>}
  </form>);
}
