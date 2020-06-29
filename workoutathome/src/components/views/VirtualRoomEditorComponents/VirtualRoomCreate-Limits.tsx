import React from 'react';


export default () => {
    const [limitParticipents, setLimitParticipents] = React.useState(3);
    const [limitPassword,setLimitPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    
    return(
        <div>
            <h2>Rooms Limitaions</h2>
            <div className="form-group">
                <label htmlFor="limit-participents">Limit Participents:</label>
                <input  className="form-control" 
                        type="number" 
                        value={limitParticipents} 
                        onChange={(event) => setLimitParticipents(parseInt(event.target.value))} 
                        id="limit-participents"/>
            </div>
            <div className="form-group">
                <label htmlFor="limit-password">Set Password:</label>
                <input  className="form-control" 
                        type={showPassword? 'text':'password'} 
                        value={limitPassword} 
                        onChange={(event) => setLimitPassword(event.target.value)} 
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
}