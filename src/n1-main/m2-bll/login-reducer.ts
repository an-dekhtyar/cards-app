import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {ApiCards} from '../../API/ApiCards';
import {Dispatch} from 'redux';
import {setUserData} from './profile-reducer';
import {setError, setIsFetching, setIsInitialized} from './app-reducer';

const initialState = {
    isAuth: false,
}

export const loginReducer = (state = initialState, action: LoginActionsType): LoginReducerStateType => {
    switch (action.type) {
        case 'cards-app/login/SET-IS-AUTH':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state

    }
};


//action creators

export const setIsAuth = (isAuth: boolean) => ({
    type: 'cards-app/login/SET-IS-AUTH',
    payload: {
        isAuth
    }
} as const)


//thunk creators

export const loginTC = (data: LoginDataType): ThunkAction<void, AppStoreType, unknown, LoginActionsType> => {
    return async (dispatch) => {
        dispatch(setIsFetching(false));
        try {
            const response = await ApiCards.login(data);
            let {_id, email, name, avatar, publicCardPacksCount} = response.data
            dispatch(setUserData({_id, email, name, avatar, publicCardPacksCount}));
            dispatch(setIsAuth(true));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(setError(error));
        }
        dispatch(setIsFetching(true))
    }
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setIsFetching(false))
    ApiCards.logout()
        .then(res => {
                let email = null
                let _id = null
                let name = ''
                let avatar = ''
                let publicCardPacksCount = null
                dispatch(setIsAuth(false))
                dispatch(setUserData({email, _id, name, avatar, publicCardPacksCount}))
            }
        )
        .catch(err => console.log(err))
        .finally(() => {
            dispatch(setIsFetching(true));
        })
}

//types

export type LoginReducerStateType = typeof initialState;

export type LoginActionsType = ReturnType<typeof setIsFetching>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setIsInitialized>

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}