import {Dispatch} from "redux";
import {ApiCards} from "../../API/ApiCards";
import {log} from "util";


let initialState:Array<string>=[]

export const authReducer = (state = initialState, action: addUserType) => {
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

export const addUserACThunk=(email:string,password:string)=>(dispatch:Dispatch)=>{
    ApiCards.addUser(email, password)
        .then((res) => {
            dispatch(addUserAC(email,password,res.config.data));
            console.log(res.config.data)
        })
}