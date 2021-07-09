import {Dispatch} from "redux";
import {ApiCards} from "../../API/ApiCards";


const initialState = {
        _id: null as string | null,
        email: null as string | null,
        name: '' as string,
        avatar: '' as string,
        publicCardPacksCount: null as number | null,
}
export type UserDataType = typeof initialState;



export const profileReducer = (state:UserDataType = initialState, action: ProfileReducerActionTypes): UserDataType => { // fix any
        switch (action.type) {
                case "cards-app/profile/SET-USER-DATA":
                        return {...action.payload}

                default: return state
        }


};

// action-creators
export const setUserData = (userData: UserDataType) => ({
        type: 'cards-app/profile/SET-USER-DATA',
        payload: {
                ...userData
        }
} as const)



//types
export type ProfileReducerActionTypes = ReturnType<typeof setUserData>


//thunk
export const changeUserDataTC = (name:string, avatar:string) => (dispatch:Dispatch) => {

        ApiCards.changeUserData(name,avatar)
            .then(resp => {
                    let {_id, email, name, avatar, publicCardPacksCount} =  resp.data.updatedUser
                    dispatch(setUserData({_id, email, name, avatar, publicCardPacksCount}))
            })

}