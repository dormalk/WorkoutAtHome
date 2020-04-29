/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ProfileDropDown from './ProfileDropDown';
import Search from './Search';
import Nav from './Nav';
import { connect } from 'react-redux';
import { logout,startSignInWithGoogle,updateUser } from '../../actions/auth';
import { toggelLeftBar } from '../../actions/system';
import { Link  } from 'react-router-dom';

// <a href="http://google.comsidebar-chat" data-toggle="sidebar-menu" className="toggle pull-right visible-xs"><i className="fa fa-comments"></i></a>

const HeaderFoo = (props) => {
    const SignInWithGoogle = () => {
      props.startSignInWithGoogle()
      .then(({user}) => {
        console.log(user)
        const updateUser = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            uid: user.uid,
            photoURL: user.photoURL,
        }
        props.updateUser(updateUser);
      })
    }
    return(
      <div className="navbar navbar-main navbar-default navbar-fixed-top" role="navigation">
      <div className="container-fluid" style={{margin: "0px"}}>
        <div className="navbar-header">
          <a className="toggle pull-left visible-xs" onClick={props.toggelLeftBar.bind(this)}><i className="fa fa-bars"></i></a>
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">{props.brand}</Link>
        </div>
        <div className="collapse navbar-collapse" id="main-nav">
          <Nav isLogin={props.isLoggedIn}/>
          <ProfileDropDown  isLogin={props.isLoggedIn}
                            userdata={props.userdata}
                            logout={() => props.logout()}
                            signIn={() => {SignInWithGoogle()}}/>
          <Search/>
        </div>

        </div>
      </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  startSignInWithGoogle: () => dispatch(startSignInWithGoogle()),
  updateUser: (user) => dispatch(updateUser(user)),
  toggelLeftBar: () => dispatch(toggelLeftBar()),
})

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.userdata.uid,
  userdata: state.userdata,
  isBarOpen: state.system.leftNav || state.system.leftFilter
})
export const Header = connect(mapStateToProps,mapDispatchToProps)(HeaderFoo)