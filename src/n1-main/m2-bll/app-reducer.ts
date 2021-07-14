import {Dispatch} from 'redux';
import {setIsAuth} from './login-reducer';
import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {ApiCards} from '../../API/ApiCards';
import {setUserData} from './profile-reducer';

const initState = {
    isFetching: true,
    error: '',
    isInitialized: false,
}


export const appReducer = (state: TState = initState, action: AppReducerActionsTypes): TState => {
    switch (action.type) {
        case 'cards-app/app/TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'cards-app/app/SET_IS_INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'cards-app/app/SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export const setIsFetching = (isFetching: boolean) =>
    ({type: 'cards-app/app/TOGGLE-IS-FETCHING', isFetching} as const)
export const setIsInitialized = (isInitialized: boolean) =>
    ({type: 'cards-app/app/SET_IS_INITIALIZED', isInitialized} as const)
export const setError = (error: string) =>
    ({type: 'cards-app/app/SET_ERROR', error} as const)


/*
export const setAppError = (error: string | null) => (dispatch:Dispatch) => {
    dispatch(setError(error))
    setTimeout(() => {
        dispatch(setError(null))
    }, 4000)
}
*/

export const authTC = () => (dispatch: Dispatch) => {
    dispatch(setIsFetching(false))
    ApiCards.auth()
        .then(response => {
            let {_id, email, name, avatar, publicCardPacksCount} = response.data
            dispatch(setUserData({_id, email, name, avatar, publicCardPacksCount}))
            dispatch(setIsAuth(true))
        })
        .catch(err => {
            const error = err.response ? err.response.data.error : (err.message + ', more details in console')
            dispatch(setError(error))
        })
        .finally(() => {
            dispatch(setIsInitialized(true))
            dispatch(setIsFetching(true))
        })
}

export const initializeApp = (): ThunkAction<void, AppStoreType, unknown, AppReducerActionsTypes> => (dispatch) => {
    dispatch(setIsFetching(false))
    dispatch(authTC())
}

export type TState = typeof initState

export type AppReducerActionsTypes =
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsInitialized>
