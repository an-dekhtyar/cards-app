import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {ApiCards, LoginResponseType} from '../../API/ApiCards';

const initialState = {
    isLoading: false,
    isAuth: false,
    _id: null as string | null,
    email: null as string | null,
    name: null as string | null,
    rememberMe: false,
    avatar: null as string | null,
    publicCardPacksCount: null as number | null,
    created: null as Date | null,
    updated: null as Date | null,
    isAdmin: false,
    verified: false,
    error: null as string | null
}

export const loginReducer = (state = initialState, action: LoginActionsType): LoginReducerStateType => {
    switch (action.type) {
        case 'cards-app/login/SET-USER-PARAMS':
        case 'cards-app/login/SET-ERROR':
        case 'cards-app/login/TOGGLE-IS-LOADING':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state

    }
};


//action creators

const toggleIsLoading = (isLoading: boolean) => ({
    type: 'cards-app/login/TOGGLE-IS-LOADING',
    payload: {
        isLoading
    }
} as const);

const setUserParams = (LoginData: LoginResponseType) => ({
    type: 'cards-app/login/SET-USER-PARAMS',
    payload: {
        ...LoginData
    }
} as const)

const setError = (error: string | null) => ({
    type: 'cards-app/login/SET-ERROR',
    payload: {
        error
    }
} as const)

const setIsAuthorized = (isAuth: boolean) => ({
    type: 'cards-app/login/SET-ERROR',
    payload: {
        isAuth
    }
} as const)


//thunk creators

export const loginTC = (data: LoginDataType): ThunkAction<void, AppStoreType, unknown, LoginActionsType> => {
    return async (dispatch) => {
        dispatch(toggleIsLoading(true));
        try {
            const response = await ApiCards.login(data);
            dispatch(setUserParams(response.data));
            dispatch(setIsAuthorized(true));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(setError(error));
        }
        dispatch(toggleIsLoading(false));
    }
}


//types

export type LoginReducerStateType = typeof initialState;

type LoginActionsType = ReturnType<typeof toggleIsLoading>
    | ReturnType<typeof setUserParams>
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsAuthorized>

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}