import React from 'react';
import { connect } from 'react-redux'

const mapStateToProp = (state) => ({
    globalAlert: state.system.globalAlert
})

export const GlobalAlert = connect(mapStateToProp)(({globalAlert}) =>{    
    return(
        globalAlert?
        <div id="global-alert" className={`alert alert-${globalAlert.type}`}>{globalAlert.message}</div>: null
    )
})
