import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Paper} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useToast } from '../context-providers/Toast';
import { useAddTodoMutation } from '../redux/todoApiSlice';
import { TodoProp } from '../pages/Todo';

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

const TaskForm: React.FC = () => {
  const classes = useStyles();
  const {showApiToast} = useToast();
  const [task, setTask] = useState("");
  const [ addTodo, { isLoading: isAdding } ] =  useAddTodoMutation();
  const addNewTodo = async (event: React.ChangeEvent<{}>) => {
    event.preventDefault();
    if(task !== ""){
      addTodo({ task, done: false } as TodoProp).then((response: any) => {
        showApiToast(response, "Todo added successfully", "Failed to add Todo");
        if(!response.error){
          setTask("");
        }
      });
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
          disabled={ isAdding }
        />
        <IconButton type="submit" color="primary" className={classes.iconButton} aria-label="directions" disabled={ isAdding }>
          <Add />
        </IconButton>
      </Paper>
  );
}

export default TaskForm;
