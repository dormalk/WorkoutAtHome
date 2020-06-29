import React from 'react';
import { Switch, Route } from 'react-router-dom';
import VirtualRooEditorRouter from './VirtualRoomEditorRouter'

export default () => (
    <Switch>
        <Route exact path="/" component={() => <div>Hello World</div>}/>
        <Route path="/editor" component={VirtualRooEditorRouter}/>
        <Route component={NotFound}></Route>
    </Switch>
);


const NotFound = () => (<div style={{height: '100vh'}}>Not found</div>)