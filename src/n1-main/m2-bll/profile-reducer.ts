

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

                case "cards-app/profile/SET-USER-DATA": {
                        return {...action.payload}
                }
        }

        return state;

};


export const setUserData = (userData: UserDataType) => ({
        type: 'cards-app/profile/SET-USER-DATA',
        payload: {
                ...userData
        }
} as const)

export type ProfileReducerActionTypes = ReturnType<typeof setUserData>