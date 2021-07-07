import {applyMiddleware, combineReducers, createStore} from "redux";
import {registrationReducer, } from "./registration-reducer";
import {loginReducer} from "./login-reducer";
import {profileReducer} from "./profile-reducer";
import thunk from "redux-thunk";
import {restorePassReducer} from "./restore-pass-reducer";
import { appReducer } from "./app-reducer";


const reducers = combineReducers({
    app:appReducer,
    registration:registrationReducer,
    login:loginReducer,
    profile:profileReducer,
    restorePass:restorePassReducer
})


export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>