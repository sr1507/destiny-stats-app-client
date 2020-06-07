import { createMuiTheme }  from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type:'dark',
    primary: {
      main: red[500],
    },
  },
  typography: {
    fontSize: 20,
  },
  
});
export default theme;