import {applyMiddleware, combineReducers, createStore} from 'redux';
import {registrationReducer,} from './registration-reducer';
import {loginReducer} from './login-reducer';
import {profileReducer} from './profile-reducer';
import thunk from 'redux-thunk';
import {restorePassReducer} from './restore-pass-reducer';
import {appReducer} from './app-reducer';
import {cardsReducer} from './cards-reducer';
import {packsReducer} from './packs-reducer';


const reducers = combineReducers({
    app: appReducer,
    registration: registrationReducer,
    login: loginReducer,
    profile: profileReducer,
    cards: cardsReducer,
    restorePass: restorePassReducer,
    packs: packsReducer,
})


export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>