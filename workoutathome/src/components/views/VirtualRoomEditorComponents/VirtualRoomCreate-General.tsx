import React from 'react';



export default () => {
    const [roomName, setRoomName] = React.useState('')
    const [brandName, setBrandName] = React.useState('')
    
    return(
        <div>
            <h2>General Configurations</h2>
            <div className="form-group">
                <label htmlFor="room-name">Room's Name:</label>
                <input  className="form-control" 
                        type="text" 
                        value={roomName} 
                        onChange={(event) => setRoomName(event.target.value)} 
                        id="room-name"/>
            </div>

            <div className="form-group">
                <label htmlFor="brand-name">Brand's Name:</label>
                <input  className="form-control" 
                        type="text" 
                        value={brandName} 
                        onChange={(event) => setBrandName(event.target.value)} 
                        id="brand-name"/>
            </div>

            <div className="form-group">
                <label htmlFor="logo-src">Upload Logo:</label>
                <input  className="form-control" 
                        type="file" 
                        id="logo-src"/>
            </div>

        </div>
    )
}
