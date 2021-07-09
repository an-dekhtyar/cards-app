import {Dispatch} from 'redux';
import {ApiCardsCard} from '../../API/ApiCardsCard';

export type DataCardType = {
    cards: CardUserType,
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardUserType = {
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
    cards: [] as Array<CardUserType>,
    currentCardsPackId: ''
}

export type InitialCardProfileReducerType = typeof initialState
export const CardProfileReducer = (state = initialState, action: allActionTypes): InitialCardProfileReducerType => {
    console.log(action)
    switch (action.type) {
        case 'GetCardsCard': {
            let newState = {...state, cards: action.data?.cards ? action.data?.cards : []};
            return newState
        }
        case 'SetCurrentPackId': {
            return {...state, currentCardsPackId: action.data};
        }
        case 'AddNewCard': {
            console.log(state)
            return {
                ...state,
                cards: [action.data, ...state.cards]
            };
        }

        default:
            return state;
    }
};

type allActionTypes = GetCardsCardACType | AddNewCardACType | SetCurrentPackIdType;

type GetCardsCardACType = ReturnType<typeof GetCardsCardAC>
export const GetCardsCardAC = (data: any) => {
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

export const GetCardsCardThunk = (id: string, setPreloader: (value: boolean) => void) => (dispatch: Dispatch) => {
    dispatch(setCurrentPackId(id))
    setPreloader(true)
    ApiCardsCard.getCardsCard(id)
        .then((res) => {
            console.log(res.data)
            dispatch(GetCardsCardAC(res.data))
        })
}

type AddNewCardACType = ReturnType<typeof AddNewCardAC>
export const AddNewCardAC = (data: any) => {
    return {
        type: 'AddNewCard',
        data
    } as const
}
export const AddNewCardThunk = (CardsPackId: string, setPreloader: (value: boolean) => void) => (dispatch: Dispatch) => {
    setPreloader(true)
    ApiCardsCard.AddCardsCard(CardsPackId)
        .then((res) => {
            console.log(res.data)
            dispatch(AddNewCardAC(res.data.newCard))
        })
        .catch(e => console.log(e))
}

export let CreateCardsPackIdThunk = (CardsPackId: string) => (dispatch: Dispatch) => {
    ApiCardsCard.AddCardsCard(CardsPackId)
        .then((res) => {
            console.log(res.data)
            // dispatch(AddNewCardAC(res.data.newCard))
        })
        .catch(e => console.log(e))
}

export let DeleteCardsCardThunk = (id: string, setPreloader: (value: boolean) => void) => (dispatch: any) => {
    setPreloader(true)
    ApiCardsCard.DeleteCardsCard(id)
        .then((res) => {
            const {cardsPack_id} = res.data.deletedCard
            dispatch(GetCardsCardThunk(cardsPack_id, setPreloader))
            setPreloader(false)
        })
}

export const UpdateCardsCardThunk = (id: string, setPreloader: (value: boolean) => void) => (dispatch: any) => {
    setPreloader(true)
    ApiCardsCard.UpdateCradsCard(id)
        .then((res) => {
            console.log(res.data)
            const {cardsPack_id} = res.data.updatedCard
            dispatch(GetCardsCardThunk(cardsPack_id, setPreloader))
            setPreloader(false)
        })
}
