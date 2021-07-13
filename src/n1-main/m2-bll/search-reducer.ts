import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {ApiCardsPack, SearchParamsType} from '../../API/ApiCardsPack';
import {cardPacksType, userType} from "../../n2-features/h1-auth/a3-profile/Cards";



const initialState = {
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
    cardPacks: [] as Array<userType>,
    token: '',
    tokenDeathTime: 1
}

export const searchReducer = (state = initialState, action: SearchActionsType): SearchReducerStateType => {
    switch (action.type) {
        case 'cards-app/search/SET-CARD-PACKS':
        case 'cards-app/search/CHANGE-SEARCH-PARAMS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state

    }
};


//action creators

export const setCardPacks = (data: CardPacksType) => ({
    type: 'cards-app/search/SET-CARD-PACKS',
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


//thunk creators

export const GETCardsPackTC = (first: boolean, searchParams?: SearchParamsType): ThunkAction<void, AppStoreType, unknown, SearchActionsType> => {

    return (dispatch, getState) => {
        const {
            packName,
            curMax,
            curMin,
            sortPacks,
            page,
            pageCount,
            user_id
        } = getState().search;

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

        ApiCardsPack.GETCardsPack(paramsData)
            .then((res) => {
                const curState = getState().search
                if (curState.packName === packName
                    && curMax === curState.curMax
                    && curMin === curState.curMin
                    && sortPacks === curState.sortPacks) {
                    dispatch(setCardPacks(res.data));
                }
                if (first) {
                    dispatch(changeSearchParams({curMax: res.data.maxCardsCount, curMin: res.data.minCardsCount}))
                }
            })
    }
}


//types

export type SearchReducerStateType = typeof initialState;

type SearchActionsType = ReturnType<typeof setCardPacks>
    | ReturnType<typeof changeSearchParams>


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
export type CardPacksType = {
    cardPacks: Array<userType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}