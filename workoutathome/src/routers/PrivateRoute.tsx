import React from 'react';
import { connect,ConnectedProps  } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../store/configureStore';

const mapStateToProps = (state : RootState) => ({
  isAuthenticated: !!state.authstate.isAuthenticated,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>


interface Props extends PropsFromRedux{
    component: React.ReactType
    rest: any
} 

const PrivateRoute = (props: Props) => (
    <Route component={() => {
            return props.isAuthenticated?
            <props.component {...props.rest}/>:
            <Redirect to='/'/>
        }}>
    </Route>
);


export default connector(PrivateRoute);
