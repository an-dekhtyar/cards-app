import {Dispatch} from 'redux';
import {ApiCardsCard} from '../../API/ApiCardsCard';
import {ThunkAction} from 'redux-thunk';
import {AppStoreType} from './store';
import {ApiCardsRating} from '../../API/ApiCardsRating';
import {AppReducerActionsTypes, setError, setIsFetching} from './app-reducer';
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
    currentPack: {
        cardsCount: 0,
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
        _id: '',

    }
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
                currentPack: action.pack
            }
        }
        default:
            return state;
    }
};

type allActionTypes = GetCardsACType | AddNewCardACType | SetCurrentPackIdType | UpdateCardType | SetCurrentPackAT;

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

export const GetCardsThunk = (id: string, setPreloader: (value: boolean) => void) => (dispatch: Dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPackId(id))
    setPreloader(true)
    ApiCardsCard.getCards(id)
        .then((res) => {
            dispatch(GetCardsAC(res.data))
        }).finally(() => {
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
type UpdateGradeDataType = { card_id: string, grade: number, shots: number }
export const UpdateCardsPackAC = (data: UpdateGradeDataType) => {
    return {
        type: 'UpdateCardsPack',
        ...data
    } as const
}
export const UpdateCardThunk = (id: string, setPreloader: (value: boolean) => void): ThunkAction<void, AppStoreType, unknown, allActionTypes> =>
    (dispatch) => {
        setPreloader(true)
        ApiCardsCard.UpdateCard(id)
            .then((res) => {
                const {cardsPack_id} = res.data.updatedCard;
                dispatch(GetCardsThunk(cardsPack_id, setPreloader))
                setPreloader(false)
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

//types

type DispatchType = allActionTypes | AppReducerActionsTypes