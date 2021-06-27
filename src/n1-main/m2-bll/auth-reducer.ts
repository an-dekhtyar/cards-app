


let initialState:Array<string>=[]

export const authReducer = (state = initialState, action: addUserType) => {
    switch (action.type){
        case 'addUser':{
            let newState=[...state]
            let newItemLoginForm = {email: action.email, password1: action.password, password2: action.password2}
            // setloginForm([...loginForm, newItemLoginForm])
                return [...newState, newItemLoginForm]
        }
        default :return state
    }
};

export type addUserType=ReturnType<typeof addUserAC>

export const addUserAC =(email:string,password:string,password2:string)=>{
    return {
        type:'addUser',
        email:email,
        password:password,
        password2:password2
    }as const
}
