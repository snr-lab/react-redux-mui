import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Checkbox, IconButton, InputBase } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { TodoProp } from '../pages/Todo';
import { useToast } from '../context-providers/Toast';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../redux/todoApiSlice';

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
  const { showApiToast } = useToast();
  const [hover, setHover] = useState(false);
  const [taskDone, setTaskDone] = useState(done);
  const [taskTxt, setTaskTxt] = useState(task);
  const [ deleteTodo, { isLoading: isDeleting, isSuccess: isDeleted } ] =  useDeleteTodoMutation();
  const [ updateTodo, { isLoading: isUpdating } ] =  useUpdateTodoMutation();
  const handleToggle = () => {
    setTaskDone((previousValue: boolean) => {
      updateTodo({id, task: taskTxt, done: !previousValue}).then((response) => {
        showApiToast(response, "Todo updated successfully", "Failed to update Todo");
      });
      return !previousValue;
    });
  }
  const handleDelete = () => {
    deleteTodo(id).then((response) => {
      showApiToast(response, "Todo deleted successfully", "Failed to delete Todo");
    });
  }
  const updateItem = () => {
    updateTodo({id, task: taskTxt, done: taskDone}).then((response) => {
      showApiToast(response, "Todo updated successfully", "Failed to update Todo");
    });
  }

  return (
      <Box className={classes.root} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <Checkbox 
          checked={taskDone}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': "id" }}
          onClick={handleToggle}
          disabled={ isUpdating || isDeleting || isDeleted }
        />
        <InputBase
          className={classes.input}
          value = {taskTxt}
          onChange = {e => setTaskTxt(e.target.value)}
          inputProps={{ 'aria-label': 'Add todo' }}
          onBlur={updateItem}
          disabled={ isUpdating || isDeleting || isDeleted }
        />
        {hover && <IconButton className={classes.iconButton} aria-label="directions" onClick={handleDelete} disabled={ isUpdating || isDeleting || isDeleted }>
          <Close />
        </IconButton>}
      </Box>
  );
}

export default TaskItem;
