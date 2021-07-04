import {Dispatch} from "redux";
import {ApiCards} from "../../API/ApiCards";

export const profileReducer = (state = {}, action: allActionTypes)=> {
    switch (action.type) {
        case 'GETCardsPack': {
            let newState={...state};
                newState=action.data
            console.log(newState)
            return newState;
        }
        default:
            return state;
    }
};

type allActionTypes= GETCardsPackACType
export type GETCardsPackACType=ReturnType<typeof GETCardsPackAC>

export const GETCardsPackAC=(data:any)=>{
    return{
        type:'GETCardsPack',
        data
    } as const
}

export const GETCardsPackThunk=()=>(diapatch:Dispatch)=>{
    ApiCards.GETCardsPack()
        .then((res)=>{
            console.log(res)
            diapatch(GETCardsPackAC(res.data))
        })
}