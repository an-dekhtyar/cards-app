import {Dispatch} from 'redux';
import {ApiCardsCard, CardSearchDataType} from '../../API/ApiCardsCard';
import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {setError, setIsFetching} from './app-reducer';
import {PackType} from '../../API/ApiCardsPack';

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
    currentCardsPackId: '',
    pack: {
        cardsCount: 1,
        created: '',
        grade: 1,
        more_id: '',
        name: '',
        path: '',
        private: false,
        rating: 1,
        shots: 1,
        type: '',
        updated: '',
        user_id: '',
        user_name: '',
        __v: 1,
        _id: ''
    } as PackType,
    cardQuestion: '',
    sortCards: '0grade',
    min: 0,
    max: 6,
    page: 1,
    pageCount: 10
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
        case 'changeCardSearchParams': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
};

type allActionTypes =
    GetCardsACType
    | AddNewCardACType
    | SetCurrentPackIdType
    | UpdateCardType
    | ChangeCardSearchParamsAT;

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

export const GetCardsThunk = (id: string, setPreloader: (value: boolean) => void): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>
    (dispatch: Dispatch, getState) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPackId(id))
        setPreloader(true)
        const {
            currentCardsPackId,
            cardQuestion,
            min,
            max,
            sortCards,
            page,
            pageCount
        } = getState().cards;


        ApiCardsCard.getCards(currentCardsPackId, {
            cardQuestion,
            min,
            max,
            sortCards,
            page,
            pageCount
        })
            .then((res) => {
                const curState = getState().cards;
                if (curState.page === page
                    && cardQuestion === curState.cardQuestion
                    && sortCards === curState.sortCards) {
                    dispatch(GetCardsAC(res.data));
                }

            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in console');
                dispatch(setError(error));
            })
            .finally(() => {
                dispatch(setIsFetching(false));
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
        setPreloader(true);
        const packId = getState().cards.currentCardsPackId;
        ApiCardsCard.AddCard(packId, name)
            .then((res) => {
                dispatch(AddNewCardAC(res.data.newCard))
            })
            .catch(e => console.log(e))
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
    setPreloader(true)
    ApiCardsCard.DeleteCard(id)
        .then((res) => {
            const {cardsPack_id} = res.data.deletedCard
            dispatch(GetCardsThunk(cardsPack_id, setPreloader))
            setPreloader(false)
        })
}

type UpdateCardType = ReturnType<typeof UpdateCardsPackAC>
export const UpdateCardsPackAC = (id: string) => {
    return {
        type: 'UpdateCardsPack',
        id: id
    } as const
}
export const UpdateCardThunk = (id: string, setPreloader: (value: boolean) => void): ThunkAction<void, AppStoreType, unknown, allActionTypes> => {
    return (dispatch) => {
        setPreloader(true)
        ApiCardsCard.UpdateCard(id)
            .then((res) => {
                const {cardsPack_id} = res.data.updatedCard;
                dispatch(GetCardsThunk(cardsPack_id, setPreloader))
                setPreloader(false)
            })
    }
}

type ChangeCardSearchParamsAT = ReturnType<typeof changeCardSearchParamsAC>
export const changeCardSearchParamsAC = (data: CardSearchDataType) => {
    return {
        type: 'changeCardSearchParams',
        payload: {
            ...data
        }
    } as const
}