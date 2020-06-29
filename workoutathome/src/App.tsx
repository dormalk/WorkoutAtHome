import React from 'react';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import { Router } from 'react-router-dom';
export const history = require("history").createBrowserHistory();


function App() {
  return (
    <Router history={history}>
      <AppRouter/>
    </Router>
  );
}

export default App;
