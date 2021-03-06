import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Checkbox, IconButton, InputBase } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { TodoProp } from '../pages/Todo';
import { deleteTodo } from '../redux/todosSlice';
import { updateTodo } from '../redux/todosSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    padding: '6px 0'
  },
  iconButton: {
    padding: 10,
  }
}));

const TaskItem: React.FC<TodoProp> = (props) => {
  const { task, id, done } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [taskDone, setTaskDone] = useState(done);
  const [taskTxt, setTaskTxt] = useState(task);
  const handleToggle = () => {
    setTaskDone((previousValue: boolean) => {
      // @ts-ignore
      dispatch(updateTodo({id, task: taskTxt, done: !previousValue}));
      return !previousValue;
    });
  }
  const handleDelete = () => {
    // @ts-ignore
    dispatch(deleteTodo(id));
  }
  const updateItem = () => {
    // @ts-ignore
    dispatch(updateTodo({id, task: taskTxt, done: taskDone}));
  }
  return (
      <Box className={classes.root} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <Checkbox 
          checked={taskDone}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': "id" }}
          onClick={handleToggle}
        />
        <InputBase
          className={classes.input}
          value = {taskTxt}
          onChange = {e => setTaskTxt(e.target.value)}
          inputProps={{ 'aria-label': 'Add todo' }}
          onBlur={updateItem}
        />
        {hover && <IconButton className={classes.iconButton} aria-label="directions" onClick={handleDelete}>
          <Close />
        </IconButton>}
      </Box>
  );
}

export default TaskItem;
