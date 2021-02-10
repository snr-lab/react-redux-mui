import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Paper} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { addTodo } from '../redux/todosSlice';

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

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const addNewTodo = (event: React.ChangeEvent<{}>) => {
    event.preventDefault();
    if(task !== ""){
      // @ts-ignore
      dispatch(addTodo(task));
      setTask("");
    }
  }
  return (
      <Paper component="form" className={classes.root} onSubmit={e => addNewTodo(e)}>
        <InputBase
          className={classes.input}
          placeholder="Add todo"
          value = {task}
          onChange = {e => setTask(e.target.value)}
          inputProps={{ 'aria-label': 'Add todo' }}
        />
        <IconButton type="submit" color="primary" className={classes.iconButton} aria-label="directions">
          <Add />
        </IconButton>
      </Paper>
  );
}

export default Login;
