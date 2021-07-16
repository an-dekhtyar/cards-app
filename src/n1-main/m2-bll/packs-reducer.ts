import {ApiCardsPack, PackType, ResponsePacksType, SearchParamsType} from '../../API/ApiCardsPack';
import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';


let initialState = {
    cardPacks: [] as Array<PackType>,
    user_id: undefined as string | undefined,
    packName: '',
    cardPacksTotalCount: 0,
    curMin: 0,
    curMax: 30,
    maxCardsCount: 60,
    minCardsCount: 0,
    sortPacks: '0updated',
    page: 1,
    pageCount: 10,
    token: '',
    tokenDeathTime: 1
}
export type PacksStateType = typeof initialState

export const packsReducer = (state = initialState, action: allActionTypes): PacksStateType => {
    switch (action.type) {
        case 'cards-app/search/SET-PACKS':
        case 'cards-app/search/CHANGE-SEARCH-PARAMS': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
};

type allActionTypes = GETPacksACType | ReturnType<typeof changeSearchParams>

export type GETPacksACType = ReturnType<typeof setPacks>
export const setPacks = (data: ResponsePacksType) => ({
    type: 'cards-app/search/SET-PACKS',
    payload: {
        ...data
    }
} as const)


export const changeSearchParams = (params: ParamsDomainType) => ({
    type: 'cards-app/search/CHANGE-SEARCH-PARAMS',
    payload: {
        ...params
    }
} as const)

export const GetPacksTC = (first: boolean, searchParams?: SearchParamsType): ThunkAction<void, AppStoreType, unknown, allActionTypes> => {
    return (dispatch, getState) => {
        const {
            packName,
            curMax,
            curMin,
            sortPacks,
            page,
            pageCount,
            user_id
        } = getState().packs;

        const paramsData: SearchParamsType = searchParams ?
            searchParams : {
                packName,
                min: curMin,
                max: curMax,
                sortPacks,
                page,
                pageCount,
                user_id
            }
        ApiCardsPack.GetPack(paramsData)
            .then((res) => {
                const curState = getState().packs;
                if (curState.packName === packName
                    && curMax === curState.curMax
                    && curMin === curState.curMin
                    && sortPacks === curState.sortPacks) {
                    dispatch(setPacks(res.data));
                }
                if (first) {
                    dispatch(changeSearchParams({curMax: res.data.maxCardsCount, curMin: res.data.minCardsCount}))
                }
            })
    }
}

export const AddNewPackThunk = (name: string, setPreloader: (value: boolean) => void): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>
    (dispatch, getState) => {
        setPreloader(true)
        ApiCardsPack.AddNewPack(name)
            .then((res) => {
                const user_id = getState().packs.user_id;
                // dispatch(AddNewCardsPackAC(res.data.newCardsPack))
                // dispatch(GETCardsPackAC(res.data))
                dispatch(GetPacksTC(false))
                setPreloader(false)
            })
    }

export const DeletePackThunk = (id: string, setPreloader: (value: boolean) => void): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>
    (dispatch, getState) => {
        setPreloader(true)
        ApiCardsPack.DeletePack(id)
            .then((res) => {
                // dispatch(DeleteCardsPackAC(id))
                dispatch(GetPacksTC(false))
                setPreloader(false)
            })
    }

export const UpdatePackThunk = (id: string,packName: string): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>
    (dispatch, getState) => {
        ApiCardsPack.UpdatePack(id, packName)
            .then((res) => {
                // dispatch(DeleteCardsPackAC(id))
                dispatch(GetPacksTC(false))
            })
    }


//types


type ParamsDomainType = {
    packName?: string
    minCardsCount?: number
    maxCardsCount?: number
    curMin?: number
    curMax?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}