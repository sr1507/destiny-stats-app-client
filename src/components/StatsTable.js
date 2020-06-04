import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getGamemodeDetails } from "../libs/gamemodeLib.js"
import { round } from "../libs/utilitiesLib.js"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(input) {

  const classes = useStyles();
  
  function createData(gamemode, KD, KDA, kills, assists, averageKills, winrate, wins) {
    return { gamemode, KD, KDA, kills, assists, averageKills, winrate, wins };
  }
  
  function createRows(input){
      var rows = [];
      for(var gamemode of input.stats.totals.gamemodeList){
        var details = getGamemodeDetails(gamemode);
        if(details && details.display){
          var winrate = round(input.stats.winRate[gamemode]*100, 1) + "%";
          var KD = round(input.stats.killsDeathsRatio[gamemode], 2);
          var KDA = round(input.stats.killsDeathsAssists[gamemode], 2);
          var averageKills = round(input.stats.averageKills[gamemode], 1); 
          rows.push(createData(details.name, KD, KDA, input.stats.totals.kills[gamemode], input.stats.totals.assists[gamemode], averageKills, winrate, input.stats.totals.wins[gamemode]));
        }
      }
      return rows;
  }
  
  const rows = createRows(input);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Gamemode</StyledTableCell>
            <StyledTableCell align="right">KD</StyledTableCell>
            <StyledTableCell align="right">KDA</StyledTableCell>
            <StyledTableCell align="right">Kills</StyledTableCell>
            <StyledTableCell align="right">Assists</StyledTableCell>
            <StyledTableCell align="right">Average Kills</StyledTableCell>
            <StyledTableCell align="right">Winrate</StyledTableCell>
            <StyledTableCell align="right">Wins</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.gamemode}
              </StyledTableCell>
              <StyledTableCell align="right">{row.KD}</StyledTableCell>
              <StyledTableCell align="right">{row.KDA}</StyledTableCell>
              <StyledTableCell align="right">{row.kills}</StyledTableCell>
              <StyledTableCell align="right">{row.assists}</StyledTableCell>
              <StyledTableCell align="right">{row.averageKills}</StyledTableCell>
              <StyledTableCell align="right">{row.winrate}</StyledTableCell>
              <StyledTableCell align="right">{row.wins}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
