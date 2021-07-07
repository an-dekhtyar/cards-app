import {Dispatch} from "redux";

import {ApiCards} from "../../API/ApiCards";


let initialState:Array<string>=[]

export const registrationReducer = (state = initialState, action: addUserType) => {
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

export const addUserAC =(email:string,password:string,data:{email:string,password:string})=>{
    return {
        type:'addUser',
        email:email,
        password:password,
            }as const
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





