import  { UserState } from "../types/user"
import  { 
            FATCH_USER,
            UserActions 
        } from '../actions/auth';

const initialState : UserState = {
    uid: '',
    username: '',
    isAuthenticated: false
}

export function authReducer(
    state = initialState,
    action: UserActions
  ): UserState {
    switch (action.type) {
      case FATCH_USER:
        return {
            ...state,
            ...action.payload,
            isAuthenticated: !!action.payload.uid
        }
      default:
        return state
    }
  }