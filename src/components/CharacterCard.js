import React from 'react';
import "./CharacterCard.css";

export default function CustomizedTables(input) {

    console.log("input = " + JSON.stringify(input));
    console.log("emblem = " + input.input.emblem);

    var source = "https://www." + input.input.emblem;

    return (
     <div class = "container">
         <img src={source} alt ="Emblem"/>
    <div class = "destiny-class">{input.input.destinyClass}</div>
    <div class = "destiny-light">{input.input.light}</div>
    <div class = "destiny-race-gender">{input.input.destinyRace + " " + input.input.destinyGender}</div>
     </div>
    );
  }
  