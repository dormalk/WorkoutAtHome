import React from 'react';
import { FilePicker } from '../commons';



export default () => {
    const [exersiceName, setExersiceName] = React.useState('');
    const [exersiceSubTitle, setExersiceSubTitle] = React.useState('');
    const [exersiceDuration, setExersiceDuration] = React.useState(0);

    return(
        <div>
            <h2>Add Exercise</h2>
            <div className="form-group">
                <label htmlFor="exersice-name">Exersice Name:</label>
                <input  className="form-control" 
                        type="text" 
                        value={exersiceName} 
                        onChange={(event) => setExersiceName(event.target.value)} 
                        id="exersice-name"/>
            </div>
            <div className="form-group">
                <label htmlFor="exersice-subtitle">Exersice Sub-Title:</label>
                <input  className="form-control" 
                        type="text" 
                        value={exersiceSubTitle} 
                        onChange={(event) => setExersiceSubTitle(event.target.value)} 
                        id="exersice-subtitle"/>
            </div>

            <div className="form-group">
                <label htmlFor="exersice-duration">Exersice Duration <small>(seconds)</small>: </label>
                <input  className="form-control" 
                        type="number" 
                        value={exersiceDuration} 
                        onChange={(event) => parseInt(event.target.value) > 0 && setExersiceDuration(parseInt(event.target.value))} 
                        id="exersice-duration"/>
            </div>

            <FilePicker label="Choose demo video"
                        onPick={(file:any) => console.log(console.log(file))}/>
        </div>
    )
}
