import React from "react";
//import {API} from "aws-amplify";
import {ListGroup} from "react-bootstrap";
//import {LinkContainer} from "react-router-bootstrap";
import StatsForm from "../components/StatsForm";
//import {onError} from "../libs/errorLib";
import "./Home.css";

export default function Home() {
  //const [notes, setNotes] = useState([]);
  
  function renderStatsPage() {
    return (<div>
      <StatsForm/>
    </div>);
  }
  
  function renderStats() {
    return (<div className="stats">
      <ListGroup>
        {renderStatsPage()}
      </ListGroup>
    </div>);
  }

  return (<div className="Home">
    {renderStats()}
  </div>);
}
