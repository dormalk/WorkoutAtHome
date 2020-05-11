import React from 'react';
import {    DiscoverScreen, 
            AddVideoScreen,
            SinglesScreen,
            AddChallengeScreen, 
            ChallengesScreen,
            ViewChallengeScreen} from '../components';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { FixVideos } from '../components/Admin/FixVideos';


export default () => (
    <Switch>
        <Route exact path="/"><DiscoverScreen/></Route>
        <PrivateRoute exact path="/addVideo" component={AddVideoScreen}/>
        <PrivateRoute exact path="/addChallenge" component={AddChallengeScreen}/>
        <Route exact  path="/singles"><SinglesScreen/></Route>
        <Route exact path="/challenges"><ChallengesScreen/></Route>
        <Route exact  path="/challenge" component={ViewChallengeScreen}/>
        <PrivateRoute exact path="/admin_fixVideos" component={FixVideos}/>
        <Route component={NotFound}></Route>
    </Switch>
);

const NotFound = () => (<div style={{height: '100vh'}}>Not found</div>)
