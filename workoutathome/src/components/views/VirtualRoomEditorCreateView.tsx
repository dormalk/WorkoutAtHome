import React from 'react';
import { Switch, Route,NavLink } from 'react-router-dom';
import General from './VirtualRoomEditorComponents/VirtualRoomCreate-General';
import Limits from './VirtualRoomEditorComponents/VirtualRoomCreate-Limits';

export default () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return(
        <div id="virtualRoomEditorCreate">
            <nav className={`nav ${isOpen? 'open':'close'}`}>
                <button onClick={() => setIsOpen(!isOpen)}><i className={`fas fa-arrow-left ${isOpen? 'open':'close'}`}></i></button>
                <h3>General Settings</h3>
                <ul>
                    <NavLink exact to="/editor/create" activeClassName="is-active">
                        <i className="fas fa-home"></i>  <span>Home</span>
                    </NavLink>
                    <NavLink to="/editor/create/general" activeClassName="is-active">
                        <i className="fas fa-cogs"></i>  <span>Room Configurations</span>
                    </NavLink>
                    <NavLink to="/editor/create/limitation" activeClassName="is-active">
                        <i className="fas fa-key"></i>  <span>Limitations</span>
                    </NavLink>
                </ul>

                <br/>
                <h3>Components</h3>
                <ul>
                    <NavLink to="/editor/create/addcomponent/excersie" activeClassName="is-active"><i className="fas fa-dumbbell"></i>  <span>Add Excersie</span></NavLink>
                    <NavLink to="/editor/create/addcomponent/res" activeClassName="is-active"><i className="fas fa-bed"></i>  <span>Add Rest</span></NavLink>
                </ul>
                <div style={{clear: 'both'}}></div>
            </nav>
            <div className="container">
                <Switch>
                    <Route exact path="/editor/create" component={() => <div>Main</div>}/>
                    <Route path="/editor/create/general" component={General}/>
                    <Route path="/editor/create/limitation" component={Limits}/>
                </Switch>
            </div>
        </div>
    )
}