import React from "react";
//import {API} from "aws-amplify";
import {PageHeader, ListGroup} from "react-bootstrap";
//import {LinkContainer} from "react-router-bootstrap";
import StatsForm from "../components/StatsForm";
import {useAppContext} from "../libs/contextLib";
//import {onError} from "../libs/errorLib";
import "./Home.css";

export default function Home() {
  //const [notes, setNotes] = useState([]);
  const {isAuthenticated} = useAppContext();

  function renderStatsPage() {
    return (<div>
      <StatsForm/>
    </div>);
  }
  function renderLander() {
    return (<div className="lander">
      <h1>Destiny Stats</h1>
      <p>A simple stats app</p>
    </div>);
  }

  function renderStats() {
    return (<div className="stats">
      <PageHeader>Your Stats</PageHeader>
      <ListGroup>
        {renderStatsPage()}
      </ListGroup>
    </div>);
  }

  return (<div className="Home">
    {renderStats()}
  </div>);
}
