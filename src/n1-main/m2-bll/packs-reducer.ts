import {Dispatch} from 'redux';

import {ApiCardsPack, PackType} from '../../API/ApiCardsPack';


let initialState = {
    packs: [] as Array<PackType>
}
export type InitialCardsPackReducerType = typeof initialState
export const packsReducer = (state = initialState, action: allActionTypes): InitialCardsPackReducerType => {
    switch (action.type) {
        case 'GETPacks': {
            let newState = {...state};
            newState = action.data
            return newState;
        }


        default:
            return state;
    }
};

type allActionTypes = GETPacksACType

export type GETPacksACType = ReturnType<typeof GETPacksAC>
export const GETPacksAC = (data: any) => {
    return {
        type: 'GETPacks',
        data
    } as const
}
export const GETPacksThunk = (user_id: string) => (dispatch: Dispatch) => {
    ApiCardsPack.GetPack({user_id})
        .then((res) => {
            debugger;
            dispatch(GETPacksAC(res.data))
        })
}

export const AddNewPackThunk = (name: string, setPreloader: (value: boolean) => void) => (dispatch: Dispatch) => {
    setPreloader(true)
    ApiCardsPack.AddNewPack(name)
        .then((res) => {
            // dispatch(AddNewCardsPackAC(res.data.newCardsPack))
            // dispatch(GETCardsPackAC(res.data))

            // @ts-ignore
            dispatch(GETPacksThunk(setPreloader))
            setPreloader(false)
        })
}

export const DeletePackThunk = (id: string, setPreloader: (value: boolean) => void) => (dispatch: Dispatch) => {
    setPreloader(true)
    ApiCardsPack.DeletePack(id)
        .then((res) => {
            // dispatch(DeleteCardsPackAC(id))

            // @ts-ignore
            dispatch(GETPacksThunk(setPreloader))
            setPreloader(false)
        })
}

export const UpdatePackThunk = (id: string, setPreloader: (value: boolean) => void) => (dispatch: Dispatch) => {
    setPreloader(true)
    ApiCardsPack.UpdatePack(id)
        .then((res) => {
            // dispatch(DeleteCardsPackAC(id))
            console.log(res.data)
            // @ts-ignore
            dispatch(GETPacksThunk(setPreloader))
            setPreloader(false)
        })
}


//types

