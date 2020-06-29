import React from 'react';
import { Switch, Route } from 'react-router-dom';
import VirtualRoomEditorView from '../components/views/VirtualRoomEditorView';
import VirtualRoomEditorCreateView from '../components/views/VirtualRoomEditorCreateView'

export default () => (
    <Switch>
        <Route exact path="/editor" component={VirtualRoomEditorView}/>
        <Route path="/editor/create" component={VirtualRoomEditorCreateView}/>
        <Route path="/editor/template" component={() => (
            <Switch>
                <Route path="/editor/template/pick" component={() => <div>Pick a template</div>}/>
            </Switch>
        )}>
        </Route>

        
        <Route component={NotFound}></Route>
    </Switch>
);
const NotFound = () => (<div style={{height: '100vh'}}>Not found</div>)