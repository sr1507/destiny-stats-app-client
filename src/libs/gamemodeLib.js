export function getGamemodeDetails(gamemode) {
  var gamemodeDetails = {
    5: { name: "All PvP", display: true, header: true },
    10: { name: "Control", display: true, header: false },
    12: { name: "Clash", display: true, header: false },
    15: { name: "Crimson Doubles", display: true, header: false },
    19: { name: "Iron Banner", display: true, header: false },
    25: { name: "All Mayhem", display: false, header: false },
    31: { name: "Supremacy", display: true, header: false },
    32: { name: "Private Matches All", display: false, header: false },
    37: { name: "Survival", display: true, header: false },
    38: { name: "Countdown", display: true, header: false },
    39: { name: "Trials Of The Nine", display: true, header: false },
    41: { name: "Trials Countdown", display: false, header: false },
    42: { name: "Trials Survival", display: false, header: false },
    43: { name: "Iron Banner Control", display: false, header: false },
    44: { name: "Iron Banner Clash", display: false, header: false },
    45: { name: "Iron Banner Supremacy", display: false, header: false },
    48: { name: "Rumble", display: true, header: false },
    49: { name: "All Doubles", display: false, header: false },
    50: { name: "Doubles", display: true, header: false },
    51: { name: "Private Matches Clash", display: false, header: false },
    52: { name: "Private Matches Control", display: false, header: false },
    53: { name: "Private Matches Supremacy", display: false, header: false },
    54: { name: "Private Matches Countdown", display: false, header: false },
    55: { name: "Private Matches Survival", display: false, header: false },
    56: { name: "Private Matches Mayhem", display: false, header: false },
    57: { name: "Private Matches Rumble", display: false, header: false },
    59: { name: "Showdown", display: true, header: false },
    60: { name: "Lockdown", display: true, header: false },
    61: { name: "Scorched", display: false, header: false },
    62: { name: "Scorched Team", display: false, header: false },
    65: { name: "Breakthrough", display: true, header: false },
    67: { name: "Salvage", display: false, header: false },
    68: { name: "Iron Banner Salvage", display: false, header: false },
    69: { name: "PvP Competitive", display: false, header: false },
    70: { name: "PvP Quickplay", display: false, header: false },
    71: { name: "Clash Quickplay", display: false, header: false },
    72: { name: "Clash Competitive", display: false, header: false },
    73: { name: "Control Quickplay", display: false, header: false },
    74: { name: "Control Competitive", display: false, header: false },
    80: { name: "Elimination", display: true, header: false },
    81: { name: "Momentum", display: true, header: false },
    84: { name: "Trials Of Osiris", display: true, header: false },
  };
  return gamemodeDetails[gamemode];
}
