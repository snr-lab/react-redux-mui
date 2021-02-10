import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, CssBaseline, LinearProgress, List, ListItem, Paper, Typography } from '@material-ui/core';
import { ListAlt } from '@material-ui/icons';
import TaskForm from '../../components/TaskForm';
import TaskItem from '../../components/TaskItem';
import { getTodos } from '../../redux/todosSlice';

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
    listRoot: {
      marginTop: theme.spacing(1),
      padding: 0,
      display: 'flex',
      width: 400,
      minHeight: 60
    },
    list: {
      width: "100%"
    },
    listItem: {
      padding: 0
    }
}));

export interface TodoProp {
  id: string
  task: string
  done: boolean
}

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.Todos.loading);
  const todoList = useSelector((state: any) => state.Todos.todoList);
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

export default Login;
