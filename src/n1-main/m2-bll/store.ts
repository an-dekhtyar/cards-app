import {combineReducers, createStore} from "redux";
import {authReducer} from "./auth-reducer";
import {loginReducer} from "./login-reducer";
import {profileReducer} from "./profile-reducer";


const reducers = combineReducers({
    auth:authReducer,
    login:loginReducer,
    profile:profileReducer
})


export const store = createStore(reducers)


export type AppStoreType = ReturnType<typeof reducers>