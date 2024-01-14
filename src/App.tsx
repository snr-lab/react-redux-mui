import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import ReduxWrapper from './redux';

import ContextProviders from './context-providers';
import CustomTheme from "./theme/custom-theme";
import Mock from "./pages/Mock";
import Todo from "./pages/Todo";

function App() {
  return (
    <ReduxWrapper>
      <>
        <CssBaseline />
        <ThemeProvider theme={CustomTheme}>
          <ContextProviders>
            <Router>
              <Switch>
                <Route path="/test" exact component={Mock} />
                <Route path="/todo" component={Todo} />
                <Redirect to="/todo"></Redirect>
              </Switch>
            </Router>
          </ContextProviders>
        </ThemeProvider>
      </>
    </ReduxWrapper>
  );
}

export default App;
