import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import General from './VirtualRoomEditorComponents/VirtualRoomCreate-General';
import Limits from './VirtualRoomEditorComponents/VirtualRoomCreate-Limits';
import LeftNavigatation from './VirtualRoomEditorComponents/LeftNavigatation';
import ExerciseComponentForm from './VirtualRoomEditorComponents/ExerciseComponentForm';
import RestComponentsForm from './VirtualRoomEditorComponents/RestComponentsForm';
import WorkoutPlanComponent from './VirtualRoomEditorComponents/WorkoutPlanComponent';
import OverviewView from './VirtualRoomEditorComponents/VirtualRoomCreate-Overview';
import { StickyElement } from '../commons';
import { WorkoutComponent, WorkoutTypes } from '../../types/workout-plan';
import { RootState } from '../../store/configureStore';
import { connect } from 'react-redux';
import { Exercise } from '../../types/exercise';
import { Rest } from '../../types/rest';

export default () => {
    return(
        <div id="virtualRoomEditorCreate">
            <LeftNavigatation/>
            <div className="container" id="virtualRoomEditorCreate_page">
                <Switch>
                    <Route exact path="/editor/create" component={OverviewView}/>
                    <Route path="/editor/create/general" component={General}/>
                    <Route path="/editor/create/limitation" component={Limits}/>
                    <Route path="/editor/create/addcomponent" component={ComponentFormView}/>
                    <Route path="/editor/create/editcomponent/:id" component={ComponentFormView}/>
                </Switch>
            </div>
        </div>
    )
}

interface StateProps{
    components?: WorkoutComponent[]
}
interface RouteInfo{
    id: string
}
const mapStateToProps = (state:RootState) => ({
    components: state.virtualroomstate.workoutPlan.components
})

const ComponentFormView = connect(mapStateToProps)((props:StateProps&RouteComponentProps<RouteInfo>) => {
    const hendleEditRoute = ():any => {
        if(props.components && props.components.length > 0 && props.match.params.id){
            const index = parseInt(props.match.params.id) - 1;
            if(index < props.components?.length && index >= 0){
                const component = props.components?.[index];
                if(component.type === WorkoutTypes.exersice) {
                    return <ExerciseComponentForm exercise={{component: component as Exercise, index}} editMode={!!component}/>
                } else if(component.type === WorkoutTypes.rest) {
                    return <RestComponentsForm rest={{component: component as Rest, index}} editMode={!!component}/>
                }
            } 
            return (<div></div>);
        }
    }
    return (
        <React.Fragment>
            <StickyElement id="WorkoutPlanComponent"  listen="virtualRoomEditorCreate_page">                 
                <WorkoutPlanComponent />
            </StickyElement>
                <Switch>
                    <Route  path="/editor/create/addcomponent/excersie" component={ExerciseComponentForm}/>
                    <Route  path="/editor/create/addcomponent/rest" component={RestComponentsForm}/>
                    <Route  path="/editor/create/editcomponent/:id" render={hendleEditRoute}/>
                </Switch>
        </React.Fragment>
    )
})