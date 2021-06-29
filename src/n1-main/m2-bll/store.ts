import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer, restorePassReducer} from "./auth-reducer";
import {loginReducer} from "./login-reducer";
import {profileReducer} from "./profile-reducer";
import thunk from "redux-thunk";


const reducers = combineReducers({
    auth:authReducer,
    login:loginReducer,
    profile:profileReducer,
    restorePass:restorePassReducer
})


export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>