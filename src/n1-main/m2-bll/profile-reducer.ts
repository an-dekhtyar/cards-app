import {Dispatch} from "redux";
import {ApiCards} from "../../API/ApiCards";
import {cardPacksType} from "../../n2-features/h1-auth/a3-profile/Profile";


//
let initialState: cardPacksType | {} = {}

export const profileReducer = (state = initialState, action: allActionTypes) => {
    switch (action.type) {
        case 'GETCardsPack': {
            let newState = {...state};
            newState = action.data
            return newState;
        }
        case "AddNewCardsPack": {
            let newState = {...state};
            let newCard = action.data
            console.log(newState)
            console.log(newCard)

            // let array = [newCard]
            //             //@ts-ignore
            // let newCards = newState.cardPacks.map((m: userType) => {
            //     array.push(m)
            // })
            // console.log(array)
            // return array

            // let array = [newCard]
            // @ts-ignore
            // let newCards = newState.cardPacks.map((m)=>{
            //     debugger
            //     array.push(m)
            // })


            // let MapCards = newState.cardPacks.map(m => ({...m, newCard}))
            // let AllCards = {...newState, cardPacks: MapCards}
            // console.log(AllCards)
            // return AllCards

            let array = [newCard]
            // @ts-ignore
            let MapCards = newState.cardPacks.map(m => {
                array.push(m)
            })
            let AllCards = {...newState, cardPacks: array}
            console.log(AllCards)
            return AllCards


        }
        default:
            return state;
    }
};

type allActionTypes = GETCardsPackACType | AddNewCardsPackType
export type GETCardsPackACType = ReturnType<typeof GETCardsPackAC>

export const GETCardsPackAC = (data: any) => {
    return {
        type: 'GETCardsPack',
        data
    } as const
}

export const GETCardsPackThunk = () => (diapatch: Dispatch) => {
    ApiCards.GETCardsPack()
        .then((res) => {
            console.log(res)
            diapatch(GETCardsPackAC(res.data))
        })
}

type AddNewCardsPackType = ReturnType<typeof AddNewCardsPackAC>

export const AddNewCardsPackAC = (data: any) => {
    return {
        type: 'AddNewCardsPack',
        data: data
    } as const
}

export const AddNewCardsPackThunk = () => (dispatch: Dispatch) => {
    ApiCards.AddNewCardsPack()
        .then((res) => {
            dispatch(AddNewCardsPackAC(res.data.newCardsPack))
            // console.log(res.data.newCardsPack)
        })
}