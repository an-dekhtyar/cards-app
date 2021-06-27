

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

export type LoginReducerStateType = typeof  initialState;

export const loginReducer = (state = initialState, action: any): LoginReducerStateType => { // fix any

       switch (action.type){

       }

       return state;

};

type LoginActionsType = {}
