import React from 'react';

export default function CustomizedTables(input) {

    console.log("input = " + JSON.stringify(input));
    console.log("emblem = " + input.input.emblem);

    var source = "https://www." + input.input.emblem;

    return (
     <div>
         <img src={source} alt ="Emblem"/>
     </div>
    );
  }
  