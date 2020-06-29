export interface User{
    uid: string;
    username: string;
}


export interface UserState extends User{
    isAuthenticated: Boolean;
}