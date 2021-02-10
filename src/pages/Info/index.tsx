import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, CssBaseline, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';

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
    }
}));

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <Box component="main">
      <CssBaseline />
      <Box className={classes.paper} maxWidth="xs">
        <Avatar className={classes.avatar}>
          <Info />
        </Avatar>
        <Typography component="h1" variant="h5">
          Info
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
