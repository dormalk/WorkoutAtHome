import React from 'react';
import AppRouter from './routers/AppRouter';
import {Header,LeftSideBar,Footer,Workout,GlobalAlert} from './components';
import { Router,Switch,Route } from 'react-router-dom';
export const history = require("history").createBrowserHistory();

class App extends React.Component{
  render(){
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/workout"><Workout/></Route>
          <Route>
          <div className="st-container page-container">
              <GlobalAlert/>
              <Header brand="Workout At Home"/>
              <LeftSideBar/>
              <AppRouter/>
              <Footer/>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  
  }
}

export default App;
