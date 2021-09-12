import { Box, FormControl } from "@material-ui/core";
import { IExpenditureHeaderProps } from "../interfaces/Interfaces";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { allMonths } from "../helpers/dateHelpers";
import UserMenu from "./UserMenu";
import { formatNumber } from "../helpers/numberHelpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function ExpenditureHeader(props: IExpenditureHeaderProps) {
  const { total, month, year, yearsSelect } = props;
  const classes = useStyles();
  const history = useHistory();
  const [monthSelected, setMonthSelected] = useState<string>(month);
  const [yearSelected, setYearSelected] = useState<string>(year);

  function handleMonthChange(event: React.ChangeEvent<{ value: unknown }>) {
    const newMonth = event.target.value as string;
    setMonthSelected(newMonth);
    toExpendituresMonth(yearSelected, newMonth);
  }

  function handleYearChange(event: React.ChangeEvent<{ value: unknown }>) {
    const newYear = event.target.value as string;
    setYearSelected(newYear);
    toExpendituresMonth(newYear, monthSelected);
  }

  function toExpendituresMonth(year: string, month: string) {
    history.push(`/expenditures/${year}-${month}`);
  }
  return (
    <Box display="flex" alignItems="center" padding="8px 16px">
      <Box flex="1" margin="8px">
        <FormControl className={classes.formControl}>
          <InputLabel id="select-month-label">Month</InputLabel>
          <Select
            labelId="select-month-label"
            value={monthSelected}
            onChange={handleMonthChange}
          >
            {allMonths.map((monthName, index) => {
              const valor = (index + 1).toString().padStart(2, "0");
              return (
                <MenuItem key={index} value={valor}>
                  {monthName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-year-label">Year</InputLabel>
          <Select
            labelId="select-year-label"
            value={yearSelected}
            onChange={handleYearChange}
          >
            {yearsSelect.map((year) => {
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box id="total" marginLeft="16px">
        Total Expenditure: <strong>{formatNumber(total)}</strong>
      </Box>
      <UserMenu />
    </Box>
  );
}
