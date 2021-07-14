import {Dispatch} from "redux";
import {ApiCards} from "../../API/ApiCards";

const initialState = {
    email: '',
    isNotifySent: false,
    isFetching: true,
    isNewPasswordSet: false
}

export const restorePassReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_EMAIL:
            return {...state, email: action.email};
        case NOTIFY_SENT:
            return {...state, isNotifySent: action.isNotifySent};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case PASSWORD_SET_SUCCESS:
            return {...state, isNewPasswordSet: action.isNewPasswordSet}
        default:
            return state
    }

};

//action types
const SET_EMAIL = 'cards-app/restore-pass/SET_EMAIL'
const NOTIFY_SENT = 'cards-app/restore-pass/NOTIFY_SENT'
const TOGGLE_IS_FETCHING = 'cards-app/restore-pass/TOGGLE_IS_FETCHING'
const PASSWORD_SET_SUCCESS = 'cards-app/restore-pass/PASSWORD_SET_SUCCESS'

//action-creators
const setEmail = (email: string) => ({type: SET_EMAIL, email} as const)
const notifySent = (isNotifySent: boolean) => ({type: NOTIFY_SENT, isNotifySent} as const)
const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
const passwordSetSuccess = (isNewPasswordSet: boolean) => ({type: PASSWORD_SET_SUCCESS, isNewPasswordSet} as const)

//thunk
export const getInstructionTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(false))
    ApiCards.getInstruction(email)
        .then((resp) => {
                resp.data.success &&
                dispatch(setEmail(email))
                dispatch(toggleIsFetching(true))
                dispatch(notifySent(true))

            }
        ).catch((err) => {
        err &&
        dispatch(toggleIsFetching(true))

    })
}
export const setNewPassword = (newPassword: string, token: string) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(false))
    ApiCards.setNewPassword(newPassword, token)
        .then((resp) => {
            resp.data &&
            dispatch(passwordSetSuccess(true))
            dispatch(toggleIsFetching(true))
        })
        .catch((err) => {
            err &&
            dispatch(toggleIsFetching(true))
        })
}
//types
type ActionType =
    | ReturnType<typeof setEmail>
    | ReturnType<typeof notifySent>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof passwordSetSuccess>

type InitialStateType = {
    email: string
    isNotifySent: boolean
    isFetching: boolean
    isNewPasswordSet: boolean
}
