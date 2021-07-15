import {Dispatch} from 'redux';
import {ApiCardsCard, updateCardRequestType} from '../../API/ApiCardsCard';
import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {isFetchingType, setIsFetching} from "./app-reducer";

export type CardType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

let initialState = {
    cards: [] as Array<CardType>,
    currentCardsPackId: ''
}

export type InitialCardProfileReducerType = typeof initialState
export const cardsReducer = (state = initialState, action: allActionTypes): InitialCardProfileReducerType => {
    switch (action.type) {
        case 'GetCardsCard': {
            return {...state, cards: action.data?.cards ? action.data?.cards : []};
        }
        case 'SetCurrentPackId': {
            return {...state, currentCardsPackId: action.data};
        }
        case 'AddNewCard': {
            return {
                ...state,
                cards: [action.data, ...state.cards]
            };
        }
        case 'UpdateCardsPack': {
            return state
        }
        default:
            return state;
    }
};

type allActionTypes = GetCardsACType | AddNewCardACType | SetCurrentPackIdType | UpdateCardType | isFetchingType;

type GetCardsACType = ReturnType<typeof GetCardsAC>
export const GetCardsAC = (data: any) => {
    return {
        type: 'GetCardsCard',
        data
    } as const
}
type SetCurrentPackIdType = ReturnType<typeof setCurrentPackId>
export const setCurrentPackId = (data: string) => {
    return {
        type: 'SetCurrentPackId',
        data
    } as const
}

export const GetCardsThunk = (id: string) => (dispatch: Dispatch) => {
    dispatch(setIsFetching(false))
    dispatch(setCurrentPackId(id))
    ApiCardsCard.getCards(id)
        .then((res) => {
            dispatch(GetCardsAC(res.data))
            dispatch(setIsFetching(true))
        })
}

type AddNewCardACType = ReturnType<typeof AddNewCardAC>
export const AddNewCardAC = (data: any) => {
    return {
        type: 'AddNewCard',
        data
    } as const
}
export const AddNewCardThunk = (name: string, setPreloader: (value: boolean) => void): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>
    (dispatch, getState) => {
        dispatch(setIsFetching(false))
        const packId = getState().cards.currentCardsPackId;
        ApiCardsCard.AddCard(packId, name)
            .then((res) => {
                dispatch(AddNewCardAC(res.data.newCard))
                dispatch(setIsFetching(true))
            })
            .catch(e => {
                dispatch(setIsFetching(true));
                console.log(e)})
    }

/*export let CreatePackIdThunk = (CardsPackId: string) => (dispatch: Dispatch) => {
    ApiCardsCard.AddCard(CardsPackId)
        .then((res) => {
            console.log(res.data)
            // dispatch(AddNewCardAC(res.data.newCard))
        })
        .catch(e => console.log(e))
}*/

export let DeleteCardThunk = (id: string, setPreloader: (value: boolean) => void) => (dispatch: any) => {
    dispatch(setIsFetching(false))
    ApiCardsCard.DeleteCard(id)
        .then((res) => {
            const {cardsPack_id} = res.data.deletedCard
            dispatch(GetCardsThunk(cardsPack_id))
            dispatch(setIsFetching(true));
        })
}

type UpdateCardType = ReturnType<typeof UpdateCardsPackAC>
export const UpdateCardsPackAC = (id: string) => {
    return {
        type: 'UpdateCardsPack',
        id: id
    } as const
}
export const UpdateCardThunk = (cards:updateCardRequestType): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>

    (dispatch) => {
        dispatch(setIsFetching(false))
        ApiCardsCard.updateCard(cards)
            .then((res) => {
                const {cardsPack_id} = res.data.updatedCard;
                dispatch(GetCardsThunk(cardsPack_id))
                dispatch(setIsFetching(true))
            })
    }
