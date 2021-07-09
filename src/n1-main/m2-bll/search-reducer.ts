import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {ApiCardsPack, SearchParamsType} from '../../API/ApiCardsPack';
import {cardPacksType, userType} from '../../n2-features/h1-auth/a3-profile/Profile';


const initialState = {
    packName: '',
    cardPacksTotalCount:0,
    curMin: 0,
    curMax: 30,
    maxCardsCount: 60,
    minCardsCount: 0,
    sortPacks: 0,
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

export const setCardPacks = (data: cardPacksType) => ({
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

export const GETCardsPackTC = (setPreloader: (value: boolean) => void): ThunkAction<void, AppStoreType, unknown, SearchActionsType> => {
    return (dispatch, getState) => {
        setPreloader(true);
        const {
            packName,
            curMax,
            curMin,
            sortPacks,
            page,
            pageCount
        } = getState().search;

        const paramsData: SearchParamsType = {
            packName,
            min: curMin,
            max: curMax,
            sortPacks,
            page,
            pageCount
        }

        ApiCardsPack.GETCardsPack(paramsData)
            .then((res) => {
               dispatch(setCardPacks(res.data))
            })
        setPreloader(false)
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
    sortPacks?: number
    page?: number
    pageCount?: number
    user_id?: string
}