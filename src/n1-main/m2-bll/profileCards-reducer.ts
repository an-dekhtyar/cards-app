import {Dispatch} from "redux";
import {userType} from "../../n2-features/h1-auth/a3-profile/Profile";
import {ApiCardsPack} from "../../API/ApiCardsPack";
import {ApiCardsCard} from "../../API/ApiCardsCard";

type DataCardType={
    cards:CardUserType,
cardsTotalCount: number
maxGrade: number
minGrade: number
packUserId:string
page: number
pageCount: number
token: string
tokenDeathTime: number
}

type CardUserType={
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
    cards: [] as Array<CardUserType>
}

export type InitialCardProfileReducerType = typeof initialState
export const CardProfileReducer = (state = initialState, action: allActionTypes): InitialCardProfileReducerType => {
    switch (action.type) {
        case "GetCardsCard":{
            let newState={...state};
            newState=action.data
            return newState
        }
        case "AddNewCard":{
            return {
                ...state,
                cards: [action.data, ...state.cards]
            }
        }

        default:
            return state;
    }
};

type allActionTypes=GetCardsCardACType| AddNewCardACType ;

type GetCardsCardACType=ReturnType<typeof GetCardsCardAC >

export const GetCardsCardAC=(data:any)=>{
    return{
        type: 'GetCardsCard',
        data
    }as const
}

export const GetCardsCardThunk=(id: string,setPreloader:(value:boolean)=>void)=>(dispatch:Dispatch)=>{
    setPreloader(true)
    ApiCardsCard.getCardsCard(id)
        .then((res)=>{
            console.log(res.data)
            dispatch(GetCardsCardAC(res.data))
        })
}

type AddNewCardACType=ReturnType<typeof AddNewCardAC>
export const AddNewCardAC=(data:any)=>{
    return{
        type: 'AddNewCard',
        data
    }as const
}

export const AddNewCardThunk=(CardsPackId: string,setPreloader:(value:boolean)=>void)=>(dispatch:Dispatch)=>{
    setPreloader(true)
    ApiCardsCard.AddCardsCard(CardsPackId)
        .then((res)=>{
            console.log(res.data)
            dispatch(GetCardsCardAC(res.data))
        })
}