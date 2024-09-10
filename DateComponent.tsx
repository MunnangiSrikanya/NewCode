/* eslint-disable */
import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

// Define types for the props
interface DateComponentProps {
  label: string;
}

// Create styles using makeStyles
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: '100%',
    marginTop: '8px'
  },
  redAsterisk: {
    color: 'red'
  }
}));

// Define the functional component with typed props
const DateComponent: React.FC<DateComponentProps> = ({ label }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <label>{label}</label>
      <TextField
        id='date'
        variant='outlined'
        // label={label}
        type='date'
        size='small'
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
          classes: {
            asterisk: classes.redAsterisk
          }
        }}
      />
    </div>
  );
};

export default DateComponent;
