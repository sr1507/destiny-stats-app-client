import React from 'react';

function StatsForm(data) {
  var kills = "";
  if (data) {
    kills = data.stats.totals.kills;
  }
  return <h1>Kills {kills}
  </h1>;
}

export default StatsForm;
