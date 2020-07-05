import React from 'react';
import {connect, useDispatch} from 'react-redux'
import { Limitations } from '../../../types/virtual-room';
import { RootState } from '../../../store/configureStore';
import { updateWorkoutLimitation } from '../../../actions/virtual-room';

interface PropsState{
    limitations?: Limitations
}

const mapStateToProps = (state:RootState) : PropsState => ({
    limitations: state.virtualroomstate.limitations
})

export default connect(mapStateToProps)((props:PropsState) => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    const dispatch = useDispatch();

    const hendleUpdateLimitation = (update: Limitations) => {
        const newLimitaions = {
            ...props.limitations,
            ...update
        }

        dispatch(updateWorkoutLimitation(newLimitaions))

    }

    return(
        <div>
            <h2>Rooms Limitaions</h2>
            <div className="form-group">
                <label htmlFor="limit-participents">Limit Participents:</label>
                <input  className="form-control" 
                        type="number" 
                        value={props.limitations?.participents || 1} 
                        onChange={(event) => hendleUpdateLimitation({participents: parseInt(event.target.value)})} 
                        id="limit-participents"/>
            </div>
            <div className="form-group">
                <label htmlFor="limit-password">Set Password:</label>
                <input  className="form-control" 
                        type={showPassword? 'text':'password'} 
                        value={props.limitations?.password || ''} 
                        onChange={(event) => hendleUpdateLimitation({password: event.target.value})} 
                        id="limit-password"/>
                        <i  className={`fa fa-eye${showPassword? '-slash':''}`}
                            onTouchStart={() => setShowPassword(true)}
                            onTouchEnd={() => setShowPassword(false)}
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}

                        ></i>
            </div>
        </div>
    )
})