import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {ApiCards, LoginResponseType} from '../../API/ApiCards';

const initialState = {
    isLoading: false,
    _id: '1',
    email: 'example@gmail.com',
    name: 'user1',
    rememberMe: false,
    avatar: null as string | null,
    publicCardPacksCount: null as number | null,
    created: '01.01.2021',
    updated: '01.06.2021',
    isAdmin: false,
    verified: false,
    error: null as string | null
}

export const loginReducer = (state = initialState, action: any): LoginReducerStateType => { // fix any

    switch (action.type) {

    }

    return state;

};


//action creators

const toggleIsLoading = (isLoading: boolean) => ({
    type: 'cards-app/login/TOGGLE-IS-LOADING',
    payload: {
        isLoading
    }
});

const setUserParams = (LoginData: LoginResponseType) => ({
    type: 'cards-app/login/SET-USER-PARAMS',
    payload: {
        ...LoginData
    }
})

const setError = (error: string | null) => ({
    type: 'cards-app/login/SET-ERROR',
    payload: {
        error
    }
})

//thunk creators

export const loginTC = (data: LoginDataType): ThunkAction<void, AppStoreType, unknown, LoginActionsType> => {
    return async (dispatch) => {
        dispatch(toggleIsLoading(true));
        try {
            const response = await ApiCards.login(data);
            dispatch(setUserParams(response.data));
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

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}