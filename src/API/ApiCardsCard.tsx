import axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
})

export let ApiCardsCard={
    getCardsCard:(id:string)=>{
        return instance.get(`cards/card?cardsPack_id=${id}`)
    },
    AddCardsCard:(CardsPackId:string)=>{
        return instance.post(`cards/card?cardsPack_id=${CardsPackId}`, {card: {cardsPack_id: CardsPackId}})
    },
    DeleteCardsCard:(id:string)=>{
        return instance.delete(`cards/card?id=${id}`)
    },
    UpdateCradsCard:(id:string)=>{
        return instance.put(`cards/card?cardsPack_id=${id}`, {card: {_id: id,question:'UPDATED'}})
    },
}
