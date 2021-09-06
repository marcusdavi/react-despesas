import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IDespesaTableProps } from '../interfaces/Interfaces';

const useStyles = makeStyles({
  table: {
    marginTop:"10px",
    minWidth: 650,
  },
});

export default function DespesaTable(props: IDespesaTableProps) {
  const {despesas} = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Despesa</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Dia</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map((despesa, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {despesa.descricao}
              </TableCell>
              <TableCell>{despesa.categoria}</TableCell>
              <TableCell>{despesa.dia}</TableCell>
              <TableCell align="right">{despesa.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}