import {Dispatch} from "redux";
import {authTC, LoginActionsType} from "./login-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";

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


export const initializeApp = () :ThunkAction<void, AppStoreType, unknown, AppReducerActionsTypes>=> (dispatch) => {
    dispatch(setIsFetching(false))
    dispatch(authTC())}

export type TState = typeof initState

export type AppReducerActionsTypes =
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsInitialized>
