import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/authAPI"
import {ApiCards} from "../../API/ApiCards";


let initialState2:Array<string>=[]

export const authReducer = (state = initialState2, action: addUserType) => {
    switch (action.type){
        case 'addUser':{
            let newState=[...state]
            let newItemLoginForm = {email: action.email, password1: action.password}
            // setloginForm([...loginForm, newItemLoginForm])
                return [...newState, newItemLoginForm]
        }
        default :return state
    }
};

export type addUserType=ReturnType<typeof addUserAC>



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
export const addUserAC =(email:string,password:string,data:{email:string,password:string})=>{
    return {
        type:'addUser',
        email:email,
        password:password,
            }as const
}

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
    authAPI.getInstruction(email)
        .then((resp) => {
                resp.data.success &&
                dispatch(setEmail(email))
                dispatch(toggleIsFetching(true))
                dispatch(notifySent(true))

            }
        )
}
export const setNewPassword = (newPassword: string, token: string) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(false))
    authAPI.setNewPassword(newPassword, token)
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
    isNewPasswordSet:boolean
}
export const addUserACThunk=(email:string,password:string,setRedirect:(value:boolean)=>void,setPreloader:(value:boolean)=>void,setErrorFromServer:(value:string)=>void)=>(dispatch:Dispatch)=>{
    setPreloader(true)
    ApiCards.addUser(email, password)
        .then((res) => {
            dispatch(addUserAC(email,password,res.config.data));
            setPreloader(false)
            setRedirect(true)
            console.log(res.config.data)
        })
        .catch((res)=>{
            console.log(res)
            setPreloader(false)
            setErrorFromServer('Email already exists, or your Password must be more than 7 characters...')
        })
}