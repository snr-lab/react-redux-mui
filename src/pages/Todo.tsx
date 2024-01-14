import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, CircularProgress, CssBaseline, LinearProgress, List, ListItem, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ListAlt } from '@material-ui/icons';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useGetTodosQuery } from '../redux/todoApiSlice';
import TaskTitle from '../components/TaskTitle';
import { useAppDispatch } from '../redux';
import { setTodoCount } from '../redux/todosSlice';

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
    },
    loadingList: {
      display: "flex",
      justifyContent: "center"
    }
}));

export interface TodoProp {
  id: number
  task: string
  done: boolean
}

const Todo: React.FC = () => {
  const classes = useStyles();
  const { data: todoList, isFetching, isLoading, isError } = useGetTodosQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTodoCount(todoList?.length || 0));
  }, [dispatch, todoList]);

  return (
    <Box component="main">
      <CssBaseline />
      <Box className={classes.progressBar}>{isFetching && <LinearProgress />}</Box>
      <Box className={classes.paper} maxWidth="xs">
        <Avatar className={classes.avatar}>
          <ListAlt />
        </Avatar>
        <TaskTitle />
        {isError && <Alert severity="error" className={classes.errorMsg}>Unable to fetch Todos</Alert>}
        <TaskForm />
        <Paper className={classes.listRoot}>
          <List className={classes.list}>
            {isLoading && <ListItem className={classes.loadingList}>
              <CircularProgress />
            </ListItem>}
            {todoList?.map((todo: TodoProp) => {
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
