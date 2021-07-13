import {Dispatch} from "redux";
import {ApiCardsPack} from "../../API/ApiCardsPack";
import {ApiCardsCard} from "../../API/ApiCardsCard";

export type DataCardType = {
    cards: CardType,
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

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
        case "UpdateCardsPack":{
            return state
        }
        default:
            return state;
    }
};

type allActionTypes = GetCardsACType | AddNewCardACType | SetCurrentPackIdType|UpdateCardType;

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
    dispatch(setCurrentPackId(id))
    setPreloader(true)
    ApiCardsCard.getCards(id)
        .then((res) => {
            console.log(res.data)
            dispatch(GetCardsAC(res.data))
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
    ApiCardsCard.AddCard(CardsPackId)
        .then((res) => {
            console.log(res.data)
            dispatch(AddNewCardAC(res.data.newCard))
        })
        .catch(e => console.log(e))
}

export let CreatePackIdThunk = (CardsPackId: string) => (dispatch: Dispatch) => {
    ApiCardsCard.AddCard(CardsPackId)
        .then((res) => {
            console.log(res.data)
            // dispatch(AddNewCardAC(res.data.newCard))
        })
        .catch(e => console.log(e))
}

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
export const UpdateCardThunk = (id: string, setPreloader:(value:boolean)=>void) => (dispatch: Dispatch) => {
    setPreloader(true)
    ApiCardsPack.UpdatePack(id)
        .then((res) => {
            // dispatch(DeleteCardsPackAC(id))
            console.log(res.data)
            // @ts-ignore
            dispatch(GETCardsPackThunk(setPreloader))
            setPreloader(false)
        })
}
