import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, CssBaseline, LinearProgress, List, ListItem, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ListAlt } from '@material-ui/icons';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { getTodos } from '../redux/todosSlice';
import { useAppDispatch, useAppSelector } from '../redux';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    progressBar: {
      minHeight: 4
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    errorMsg: {
      width: 400,
      marginBottom: theme.spacing(1)
    },
    listRoot: {
      marginTop: theme.spacing(1),
      padding: 0,
      display: 'flex',
      width: 400,
      minHeight: 60
    },
    list: {
      width: '100%'
    },
    listItem: {
      padding: 0
    }
}));

export interface TodoProp {
  id: number
  task: string
  done: boolean
}

const Todo: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: any) => state.todos.loading);
  const errorMsg = useAppSelector((state: any) => state.todos.errorMsg);
  const todoList = useAppSelector((state: any) => state.todos.todoList);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <Box component="main">
      <CssBaseline />
      <Box className={classes.progressBar}>{loading && <LinearProgress />}</Box>
      <Box className={classes.paper} maxWidth="xs">
        <Avatar className={classes.avatar}>
          <ListAlt />
        </Avatar>
        <Typography component="h1" variant="h5">
          Todo List
        </Typography>
        {errorMsg && <Alert severity="error" className={classes.errorMsg}>{errorMsg}</Alert>}
        <TaskForm />
        <Paper className={classes.listRoot}>
          <List className={classes.list}>
            {todoList.map((todo: TodoProp) => {
              return (
                <ListItem className={classes.listItem} key={todo.id} role={undefined}>
                  <TaskItem task={todo.task} id={todo.id} done={todo.done} />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

export default Todo;
