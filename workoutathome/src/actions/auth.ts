import { User } from "../types/user";

export const FATCH_USER = 'FATCH_USER'; 

interface FatchUserAction {
    type: typeof FATCH_USER;
    payload: User;
}




export type UserActions = FatchUserAction;
