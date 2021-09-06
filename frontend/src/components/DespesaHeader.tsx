import { Box, FormControl } from "@material-ui/core";
import { IDespesaHeaderProps } from "../interfaces/Interfaces";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useState} from "react";
import { useHistory } from "react-router-dom";

const meses: string[] = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function DespesaHeader(props: IDespesaHeaderProps) {
  const { total, month, year, years } = props;
  const classes = useStyles();
  const history = useHistory();
  const [mesSelected, setMesSelected] = useState<string>(month);
  const [anoSelected, setAnoSelected] = useState<string>(year);

  function handleMonthChange(event: React.ChangeEvent<{ value: unknown }>){
    const mes = event.target.value as string
    setMesSelected(mes);

    history.push(`/despesas/${anoSelected}-${mes}`);
  };

  function handleYearChange(event: React.ChangeEvent<{ value: unknown }>){
    const ano = event.target.value as string
    setAnoSelected(ano);
    history.push(`/despesas/${ano}-${mesSelected}`);
  };
  return (
    <Box display="flex" alignItems="center">
      <Box flex="1" margin="8px">
      <FormControl className={classes.formControl}>
        <InputLabel id="select-mes-label">Mês</InputLabel>
        <Select
          labelId="select-mes-label"
          value={mesSelected}
          onChange={handleMonthChange}
        > 
        {meses.map((mes, index) => {
        const valor = (index+1).toString().padStart(2, "0");;
        return <MenuItem key={index} value={valor}>{mes}</MenuItem>})}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-ano-label">Ano</InputLabel>
        <Select
          labelId="select-ano-label"
          value={anoSelected}
          onChange={handleYearChange}
        > 
        {years.map((year) => {
        return <MenuItem key={year} value={year}>{year}</MenuItem>})}
        </Select>
      </FormControl>
      </Box>
      <Box id="total" margin="8px">
        Despesa total: <strong>{total}</strong>
      </Box>
    </Box>
  );
}
