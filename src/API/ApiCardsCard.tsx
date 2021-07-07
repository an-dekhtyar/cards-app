import axios from "axios";

let instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export let ApiCardsCard={
    getCardsCard:(id:string)=>{
        return instance.get(`cards/card?cardsPack_id=${id}`)
    },
    AddCardsCard:(CardsPackId:string)=>{
        return instance.post(`cards/card?cardsPack_id:${CardsPackId}`)
    }
}