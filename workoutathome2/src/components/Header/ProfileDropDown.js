/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';


export default ({isLogin,signIn,userdata,logout}) => {
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
                        <li><a href="#none"><i className="fa fa-user"></i>Profile</a></li>
                        <li><a href="#none"><i className="fa fa-wrench"></i>Settings</a></li>
                        <li  onClick={() => {logout()}}><a href="#none"><i className="fa fa-sign-out"></i>Logout</a></li>
                        </ul>
                    </React.Fragment>    
                ):
                <div className="sign-btn" onClick={()=>signIn()}>Sign In <i className="fa fa-google"></i></div>
            }
        </li>
    </ul>

    )
}