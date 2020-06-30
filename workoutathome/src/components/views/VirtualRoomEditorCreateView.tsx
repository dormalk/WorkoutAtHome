import React from 'react';
import { Switch, Route } from 'react-router-dom';
import General from './VirtualRoomEditorComponents/VirtualRoomCreate-General';
import Limits from './VirtualRoomEditorComponents/VirtualRoomCreate-Limits';
import LeftNavigatation from './VirtualRoomEditorComponents/LeftNavigatation';
import AddExercise from './VirtualRoomEditorComponents/VirtualRoomCreate-AddExercise';

export default () => {
    return(
        <div id="virtualRoomEditorCreate">
            <LeftNavigatation/>
            <div className="container">
                <Switch>
                    <Route exact path="/editor/create" component={() => <div>Main</div>}/>
                    <Route path="/editor/create/general" component={General}/>
                    <Route path="/editor/create/limitation" component={Limits}/>
                    <Route path="/editor/create/addcomponent/excersie" component={AddExercise}/>

                </Switch>
            </div>
        </div>
    )
}