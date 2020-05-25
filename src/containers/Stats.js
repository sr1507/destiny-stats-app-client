import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import "./Stats.css";
import {API} from "aws-amplify";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    gamertag: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState("");

  function validateForm() {
    return fields.gamertag.length > 0 && fields.gamertag.length <= 100;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    let params = {
        "queryStringParameters":
        {
            "membershipId": "4611686018435930668",
            "membershipType":2
        }
    }

    const stats = API.get("stats", "/get", params)
      .then((statsResponse) => {
        console.log(statsResponse);
        setStats(stats);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="gamertag" bsSize="large">
          <ControlLabel>PSN/Gamertag</ControlLabel>
          <FormControl
            type="string"
            onChange={handleFieldChange}
            value={fields.gamertag}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Submit
        </LoaderButton>
      </form>
    );
  }

  return <div className="Stats">{renderForm()}</div>;
}
