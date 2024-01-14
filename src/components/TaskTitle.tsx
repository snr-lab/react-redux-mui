import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { RootStateType, useAppSelector } from '../redux';

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'relative',
      width: 400
    },
    title: {
      textAlign: "center"
    },
    count: {
      position: 'absolute',
      top: 4,
      right: 16
    }
}));

const TaskTitle: React.FC = () => {
  const classes = useStyles();
  const todoCount = useAppSelector((state: RootStateType) => state.todos.todoCount);
  return (
    <Box className={ classes.root }>
      <Typography component="h5" variant="h5" className={ classes.title }>Todo List</Typography>
      <Typography component="p" className={ classes.count }>Count: {todoCount}</Typography>
    </Box>
  )
}

export default TaskTitle