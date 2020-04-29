import { matchPath } from 'react-router';

export const toggelLeftBar = () => {
    return (dispatch) => {
        if(!matchPath(window.location.pathname,"/singles") && !matchPath(window.location.pathname,"/challenges")){
            dispatch({type: 'TOGGEL_LEFT_NAV'})
          } else {
            dispatch({type: 'TOGGEL_LEFT_FILTER'})
          }

    }
}

export const closeLeftNav = () => {
    return (dispatch) => {
      dispatch({type: 'CLOSE_LEFT_NAV'})
    }
}


export const activeGlobalAlert = ({type,message}) => {
  return (dispatch) => {
    dispatch({type: 'SHOW_GLOBAL_ALERT',globalAlert:{type,message}})
    setTimeout(() => {
      dispatch({type: 'HIDE_GLOBAL_ALERT'})
    },3000)
  }
}