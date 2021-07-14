import { Dispatch } from "redux";
import { ApiCards } from "../../API/ApiCards";
import { setIsFetching } from "./app-reducer";


const initialState = {
        _id: null as string | null,
        email: null as string | null,
        name: '' as string,
        avatar: '' as string,
        publicCardPacksCount: null as number | null,
        editMode:false
}
type ResponceUserType = {
        _id: string | null
        email: string | null
        name: string
        avatar: string
        publicCardPacksCount: number | null
}

export type UserDataType = typeof initialState;


export const profileReducer = (state: UserDataType = initialState, action: ProfileReducerActionTypes): UserDataType => { // fix any
        switch (action.type) {
                case "cards-app/profile/SET-USER-DATA":
                        return { ...state,
                                ...action.payload };
                case "cards-app/profile/TOGGLE_EDIT_MODE":
                        return {
                                ...state,
                                editMode:action.editMode
                        }
                default: return state
        }


};

// action-creators
export const setUserData = (userData: ResponceUserType) => ({
        type: 'cards-app/profile/SET-USER-DATA',
        payload: {
                ...userData
        }} as const)

export const toggleEditMode = (editMode:boolean) => ({
        type: 'cards-app/profile/TOGGLE_EDIT_MODE', editMode
} as const)



//types
export type ProfileReducerActionTypes = ReturnType<typeof setUserData> | ReturnType<typeof toggleEditMode>


//thunk
export const changeUserDataTC = (name: string, avatar: string) => (dispatch: Dispatch) => {
        dispatch(setIsFetching(false))
        ApiCards.changeUserData(name, avatar)
            .then(resp => {
                    let { _id, email, name, avatar, publicCardPacksCount } = resp.data.updatedUser
                    dispatch(setUserData({ _id, email, name, avatar, publicCardPacksCount }))
                    dispatch(setIsFetching(true))
                    dispatch(toggleEditMode(false))
            })


}

