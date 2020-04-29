import React from 'react';
import { Link  } from 'react-router-dom';


export default ({isLogin}) => {
    return(
    <ul className="nav navbar-nav">
        {isLogin && <li><Link to="/addVideo">Add Video <i className="fa fa-film"></i></Link></li>}
        {isLogin && <li><Link to="/addChallenge">Create Challenge <i className="fa fa-star"></i></Link></li>}
      </ul>

    );
}