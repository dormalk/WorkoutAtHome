/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {withRouter} from 'react-router-dom';

export default withRouter(({isLogin,signIn,userdata,logout,history}) => {
    return (
    <ul className="nav navbar-nav navbar-right ">
        <li className="dropdown user">
            {
                isLogin? (
                    <React.Fragment>
                        <a  style={{lineHeight: 0}} className="dropdown-toggle" data-toggle="dropdown">
                            <img src={userdata.photoURL} alt="" className="img-circle" /> {userdata.displayName}<span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" role="menu">
                        <li><a><i className="fa fa-user"></i>Profile</a></li>
                        <li><a><i className="fa fa-wrench"></i>Settings</a></li>
                        <li onClick={() => history.push('/addVideo')}><a><i className="fa fa-film"></i>Add Video</a></li>
                        <li onClick={() => history.push('/addChallenge')}><a><i className="fa fa-star"></i>Create Challenge</a></li>
                        <li onClick={() => {logout()}}><a><i className="fa fa-sign-out"></i>Logout</a></li>
                        </ul>
                    </React.Fragment>    
                ):
                <div className="sign-btn" onClick={()=>signIn()}>Sign In <i className="fa fa-google"></i></div>
            }
        </li>
    </ul>

    )
})