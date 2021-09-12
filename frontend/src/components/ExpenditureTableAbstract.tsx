import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { formatNumber } from "../helpers/numberHelpers";
import { IExpenditureTableAbstractProps } from "../interfaces/Interfaces";

const useStyles = makeStyles({
  table: {
    margin: "auto",
    minWidth: 350,
    maxWidth: 450,
    textAlign: "center",
    borderTop: "1px solid rgb(224, 224, 224)",
    tableLayout: "fixed",
  },
  header: {
    fontWeight: "bold",
    background: "linear-gradient(45deg, #38A3A5 30%, #57CC99 90%)",
  },
});

export default function ExpenditureTableAbstract(
  props: IExpenditureTableAbstractProps
) {
  const { expenditures } = props;
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell>Category</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenditures.map((expenditure, index) => (
            <TableRow key={index}>
              <TableCell>{expenditure.category}</TableCell>
              <TableCell align="right">
                {formatNumber(expenditure.totalValue)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
