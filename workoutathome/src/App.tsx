import React from 'react';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import { Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

export const history = require("history").createBrowserHistory();


function App() {
  return (
    <Router history={history}>
      <LastLocationProvider>
        <AppRouter/>
      </LastLocationProvider>
    </Router>
  );
}

export default App;
