import React from 'react';
import { Link  } from 'react-router-dom';


export default ({isLogin}) => {
    return(
    <ul className="nav navbar-nav">
        <li><Link to="/singles">Workouts <i className="fa fa-youtube"></i></Link></li>
        <li><Link to="/challenge">Challenges <i className="fa fa-star"></i></Link></li>
      </ul>

    );
}