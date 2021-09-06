import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IDespesaHeaderProps } from "../interfaces/Interfaces";

const useStyles = makeStyles({
  table: {
    marginTop: "10px",
    minWidth: 650,
  },
});

export default function DespesaHeader(props: IDespesaHeaderProps) {
  const {total, month, year} = props;

  return (
    <>
      <div>{month}</div>
      <div>{year}</div>
      <div>{total}</div>
    </>
  );
}
