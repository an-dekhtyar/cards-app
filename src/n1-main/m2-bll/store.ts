import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer, } from "./auth-reducer";
import {loginReducer} from "./login-reducer";
import {profileReducer} from "./profile-reducer";
import thunk from "redux-thunk";
import {restorePassReducer} from "./restore-pass-reducer";
import {CardProfileReducer} from "./profileCards-reducer";


const reducers = combineReducers({
    auth:authReducer,
    login:loginReducer,
    profile:profileReducer,
    cardProfile:CardProfileReducer,
    restorePass:restorePassReducer
})


export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>