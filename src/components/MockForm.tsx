import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Paper} from '@material-ui/core';
import { ArrowForward, HourglassEmpty } from '@material-ui/icons';
import { RootStateType, useAppDispatch, useAppSelector } from '../redux';
import { mockAsync } from '../redux/todosSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}));

const MockForm: React.FC = () => {
  const classes = useStyles();
  const [mockText, setMockText] = useState("");
  const mockDataLoading = useAppSelector((state: RootStateType) => state.todos.mockDataLoading);
  const dispatch = useAppDispatch();
  const submitForm = async (event: React.ChangeEvent<{}>) => {
    event.preventDefault();
    dispatch(mockAsync(mockText));
  }
  return (
      <Paper component="form" className={classes.root} onSubmit={e => submitForm(e)}>
        <InputBase
          className={classes.input}
          placeholder="Enter someting"
          value = {mockText}
          onChange = {e => setMockText(e.target.value)}
          inputProps={{ 'aria-label': 'Enter someting' }}
          disabled={ mockDataLoading }
        />
        <IconButton type="submit" color="primary" className={classes.iconButton} aria-label="directions" disabled={ mockDataLoading }>
          { mockDataLoading ? <HourglassEmpty /> : <ArrowForward /> }
        </IconButton>
      </Paper>
  );
}

export default MockForm;
