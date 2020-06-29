/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
export default ({onStart}) => {
    const [message,setMessage] = React.useState(null);

    function copyUrl() {
        /* Get the text field */
        var dummy = document.createElement('input'),
        text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        setMessage('The link copied to clipboard');
      }

    return(
        <div id="share_workout"  className="portrait">
            <div className="panel panel-default">
                <h4 className="page-section-heading">Before you start - </h4>
                <p>
                For a unique fitness experience -- Copy the link below and send it to your friends before strarting.                </p>
 
                    {
                        message &&
                        <div className="alert alert-success" style={{margin: '0.5rem 1rem'}}>
                            {message}
                        </div>
                    }
                <div className="form-group row" style={{margin: '1rem'}}>
                    <input type="text" disabled="true" value={window.location.href} className="form-control"/>
                    <i style={{margin: '1rem', cursor: 'pointer'}} onClick={() => copyUrl()} className="fa fa-copy"></i>
                </div>
                <button className="btn btn-danger" onClick={() => onStart()}>Let's start the workout!</button>
            </div>
        </div>
    )
}