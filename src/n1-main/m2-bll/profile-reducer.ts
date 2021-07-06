import {Dispatch} from "redux";
import {userType} from "../../n2-features/h1-auth/a3-profile/Profile";
import {ApiCardsPack} from "../../API/ApiCardsPack";

let initialState = {
    cardPacks: [] as Array<userType>
}
export type InitialProfileReducerType = typeof initialState
export const profileReducer = (state = initialState, action: allActionTypes): InitialProfileReducerType => {
    switch (action.type) {
        case 'GETCardsPack': {
            let newState = {...state};
            newState = action.data
            return newState;
        }
        case "AddNewCardsPack": {
            return {
                ...state,
                cardPacks: [action.data, ...state.cardPacks]
            }
        }
        case "DeleteCardsPack": {
            debugger
            // let newState={...state};
            // debugger
            // // @ts-ignore
            // let filterCard=newState.cardPacks.filter(f=>f._id!==action.id)
            // console.log(filterCard)
            // return [filterCard]
            return {
                ...state,
                cardPacks: state.cardPacks.filter(f => f._id !== action.id)
            }
        }
        case "UpdateCardsPack":{
            return state
        }

        default:
            return state;
    }
};

type allActionTypes = GETCardsPackACType | AddNewCardsPackType | DeleteCardsPackType|UpdateCardsPackType
export type GETCardsPackACType = ReturnType<typeof GETCardsPackAC>

export const GETCardsPackAC = (data: any) => {
    return {
        type: 'GETCardsPack',
        data
    } as const
}

export const GETCardsPackThunk = (setPreloader: (value: boolean) => void) => (dispatch: Dispatch) => {
    setPreloader(true)
    ApiCardsPack.GETCardsPack()
        .then((res) => {
            dispatch(GETCardsPackAC(res.data))
        })
    setPreloader(false)
}

type AddNewCardsPackType = ReturnType<typeof AddNewCardsPackAC>

export const AddNewCardsPackAC = (data: any) => {
    return {
        type: 'AddNewCardsPack',
        data: data
    } as const
}

export const AddNewCardsPackThunk = (setPreloader: (value: boolean) => void) => (dispatch: Dispatch) => {
    setPreloader(true)
    ApiCardsPack.AddNewCardsPack()
        .then((res) => {
            // dispatch(AddNewCardsPackAC(res.data.newCardsPack))
            // dispatch(GETCardsPackAC(res.data))

            // @ts-ignore
            dispatch(GETCardsPackThunk(setPreloader))
            setPreloader(false)
        })
}

type DeleteCardsPackType = ReturnType<typeof DeleteCardsPackAC>

export const DeleteCardsPackAC = (id: string) => {
    return {
        type: 'DeleteCardsPack',
        id: id
    } as const
}

export const DeleteCardsPackThunk = (id: string,setPreloader:(value:boolean)=>void) => (dispatch: Dispatch) => {
    setPreloader(true)
    ApiCardsPack.DeleteCardsPack(id)
        .then((res) => {
            // dispatch(DeleteCardsPackAC(id))

            // @ts-ignore
            dispatch(GETCardsPackThunk(setPreloader))
            setPreloader(false)
        })
}

type UpdateCardsPackType = ReturnType<typeof UpdateCardsPackAC>

export const UpdateCardsPackAC = (id: string) => {
    return {
        type: 'UpdateCardsPack',
        id: id
    } as const
}

export const UpdateCardsPackThunk = (id: string,setPreloader:(value:boolean)=>void) => (dispatch: Dispatch) => {
    setPreloader(true)
    ApiCardsPack.UpdateCardsPack(id)
        .then((res) => {
            // dispatch(DeleteCardsPackAC(id))
            console.log(res.data)
            // @ts-ignore
            dispatch(GETCardsPackThunk(setPreloader))
            setPreloader(false)
        })
}