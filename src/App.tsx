import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { store } from './redux';

import CustomTheme from "./theme/custom-theme";
import Info from "./pages/Info";
import Todo from "./pages/Todo";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={CustomTheme}>
        <Router>
          <Switch>
            <Route path="/info" exact component={Info} />
            <Route path="/todo" component={Todo} />
            <Redirect to="/todo"></Redirect>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
