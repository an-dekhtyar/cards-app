import {Dispatch} from 'redux';
import {ApiCardsCard, CardSearchDataType, updateCardRequestType} from '../../API/ApiCardsCard';
import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {AppReducerActionsTypes, isFetchingType, setError, setIsFetching} from './app-reducer';
import {ApiCardsRating} from '../../API/ApiCardsRating';
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
    editCardMode: false,
    addCardMode: false,
    pack: {
        cardsCount: 1000,
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
    currentUserId: '',
    cardQuestion: '',
    cardsTotalCount: 1,
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
            return {
                ...state,
                currentUserId: action.data.packUserId,
                cards: action.data.cards,
                pageCount: action.data.pageCount,
                cardsTotalCount: action.data.cardsTotalCount
            };
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
            const cardsCopy = [...state.cards];

            return {
                ...state,
                cards: cardsCopy.map(card => card._id === action.card_id ? {
                    ...card,
                    grade: action.grade,
                    shots: action.shots
                } : card)
            }
        }
        case 'SetCurrentPack': {
            return {
                ...state,
                pack: action.pack
            }
        }
        case 'changeCardSearchParams': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'cards-app/card/TOGGLE_ADD_CARD_MODE': {
            return {
                ...state,
                addCardMode: action.addCardMode
            };
        }
        case 'cards-app/card/TOGGLE_EDIT_CARD_MODE': {
            return {
                ...state,
                editCardMode: action.editCardMode
            };
        }
        default:
            return state;
    }
};
//types
type allActionTypes =
    GetCardsACType
    | AddNewCardACType
    | SetCurrentPackIdType
    | UpdateCardType
    | isFetchingType
    | SetCurrentPackAT
    | ChangeCardSearchParamsAT
    | EditCardModeActionType
    | AddCardModeActionType

type GetCardsACType = ReturnType<typeof GetCardsAC>
type SetCurrentPackIdType = ReturnType<typeof setCurrentPackId>
export type EditCardModeActionType = ReturnType<typeof toggleEditCardMode>
export type AddCardModeActionType = ReturnType<typeof togglAddCardMode>


export const GetCardsAC = (data: CardDataResponseType) => {
    return {
        type: 'GetCardsCard',
        data
    } as const
}
export const setCurrentPackId = (data: string) => {
    return {
        type: 'SetCurrentPackId',
        data
    } as const
}
export const toggleEditCardMode = (editCardMode: boolean) => ({
    type: 'cards-app/card/TOGGLE_EDIT_CARD_MODE', editCardMode
} as const)
export const togglAddCardMode = (addCardMode: boolean) => ({
    type: 'cards-app/card/TOGGLE_ADD_CARD_MODE', addCardMode
} as const)


export const GetCardsThunk = (id: string): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>
    (dispatch: Dispatch, getState) => {
        dispatch(setIsFetching(false));
        dispatch(setCurrentPackId(id))
        const {
            cardQuestion,
            min,
            max,
            sortCards,
            page,
            pageCount
        } = getState().cards


        ApiCardsCard.getCards(id, {
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
                dispatch(setIsFetching(true));
            })
    }
type AddNewCardACType = ReturnType<typeof AddNewCardAC>
export const AddNewCardAC = (data: any) => {
    return {
        type: 'AddNewCard',
        data
    } as const
}
export const AddNewCardThunk = (cardsPack_id:string, newAnswer:string, newQuestion:string): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>
    (dispatch, getState) => {
        dispatch(setIsFetching(false))
        let card = {cardsPack_id,
            answer: newAnswer,
            question: newQuestion}
        ApiCardsCard.AddCard(card)
            .then((res) => {
                dispatch(AddNewCardAC(res.data.newCard))
                dispatch(setIsFetching(true))
            })
            .catch(e => {
                dispatch(setIsFetching(true));
                console.log(e)
            })
    }

/*export let CreatePackIdThunk = (CardsPackId: string) => (dispatch: Dispatch) => {
    ApiCardsCard.AddCard(CardsPackId)
        .then((res) => {
            console.log(res.data)
            // dispatch(AddNewCardAC(res.data.newCard))
        })
        .catch(e => console.log(e))
}*/

export let DeleteCardThunk = (id: string) => (dispatch: any) => {
    dispatch(setIsFetching(false))
    ApiCardsCard.DeleteCard(id)
        .then((res) => {
            const {cardsPack_id} = res.data.deletedCard
            dispatch(GetCardsThunk(cardsPack_id))
            dispatch(setIsFetching(true));
        })
}

type UpdateCardType = ReturnType<typeof UpdateCardsPackAC>
type UpdateGradeDataType = { card_id: string, grade: number, shots: number }
export const UpdateCardsPackAC = (data: UpdateGradeDataType) => {
    return {
        type: 'UpdateCardsPack',
        ...data
    } as const
}
export const UpdateCardThunk = (card: updateCardRequestType): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>

    (dispatch) => {
        dispatch(setIsFetching(false))
        ApiCardsCard.updateCard(card)
            .then((res) => {
                const {cardsPack_id} = res.data.updatedCard;
                dispatch(GetCardsThunk(cardsPack_id))
                dispatch(setIsFetching(true))
                dispatch(toggleEditCardMode(false))
            })
    }

export const UpgradeCardGradeThunk = (card_id: string, grade: number): ThunkAction<void, AppStoreType, unknown, DispatchType> => {
    return (dispatch) => {
        ApiCardsRating.setRatingCard(grade, card_id)
            .then((res) => {
                const {
                    grade,
                    shots
                } = res.data.updatedGrade;
                dispatch(UpdateCardsPackAC({card_id, grade, shots}))
            })
            .catch((e) => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in console');
                dispatch(setError(error));
            }).finally(() => {
        })
    }
}

type SetCurrentPackAT = ReturnType<typeof setCurrentPackAC>
export const setCurrentPackAC = (pack: PackType) => {
    return {
        type: 'SetCurrentPack',
        pack
    } as const
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
//types

type DispatchType = allActionTypes | AppReducerActionsTypes

type CardDataResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
}