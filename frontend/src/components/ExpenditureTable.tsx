import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IExpenditureTableProps } from '../interfaces/Interfaces';
import { formatNumber } from '../helpers/numberHelpers';

const useStyles = makeStyles({
  table: {
    marginTop:"10px",
    minWidth: 650,
    borderTop: "1px solid rgb(224, 224, 224)",
    tableLayout: "fixed",
  },
  header: {
    fontWeight: "bold",
    background: 'linear-gradient(45deg, #38A3A5 30%, #57CC99 90%)'
  }
});

export default function ExpenditureTable(props: IExpenditureTableProps) {
  const {expenditures} = props;
  const classes = useStyles();
   return (<TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell>Expenditure</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Day</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenditures.map((expenditure, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {expenditure.description}
              </TableCell>
              <TableCell>{expenditure.category}</TableCell>
              <TableCell>{expenditure.day}</TableCell>
              <TableCell align="right">{formatNumber(expenditure.totalValue)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>);
}