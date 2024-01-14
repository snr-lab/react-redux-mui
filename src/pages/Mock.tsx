import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, CssBaseline, Typography } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';
import MockForm from '../components/MockForm';
import { RootStateType, useAppSelector } from '../redux';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    message: {
      width: 400
    },
    error: {
      width: 400,
      color: "#cc0000"
    }
}));

const Mock: React.FC = () => {
  const classes = useStyles();
  const mockDataLoading = useAppSelector((state: RootStateType) => state.todos.mockDataLoading);
  const mockData = useAppSelector((state: RootStateType) => state.todos.mockData);
  const mockErrorMessage = useAppSelector((state: RootStateType) => state.todos.mockDataErrorMsg);

  return (
    <Box component="main">
      <CssBaseline />
      <Box className={classes.paper} maxWidth="xs">
        <Avatar className={classes.avatar}>
          <InfoIcon />
        </Avatar>
        <Typography component="h5" variant="h5">
          Hello
        </Typography>
        <MockForm />
        { !mockErrorMessage && !mockDataLoading && <Typography component="p" variant="h6" className={ classes.message }>{ mockData?.message }</Typography> }
        { mockErrorMessage && !mockDataLoading && <Typography component="p" variant="h6" className={ classes.error }>{ mockErrorMessage }</Typography> }
      </Box>
    </Box>
  );
}

export default Mock;
