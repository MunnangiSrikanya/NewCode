import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

// Define types for props
interface DateComponentProps {
  label: string;
  handleDateChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
    marginTop: '8px',
  },
  redAsterisk: {
    color: 'red',
  },
}));

// Functional component with TypeScript
const DateComponent: React.FC<DateComponentProps> = ({ label,handleDateChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <label>{label}</label>

      <TextField
        id="date"
        variant="outlined"
        type="date"
        size="small"
        onChange={handleDateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
          classes: {
            asterisk: classes.redAsterisk,
          },
        }}
      />
    </div>
  );
};

export default DateComponent;
