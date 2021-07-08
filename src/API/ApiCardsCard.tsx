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
        return instance.post(`cards/card?cardsPack_id=${CardsPackId}`, {card: {cardsPack_id: CardsPackId}})
    }
}

// 60e3022aa8b1610004c03ce1

// card: {
//     cardsPack_id: "5eb543f6bea3ad21480f1ee7"

// AddNewCardsPack:()=>{
//     return instance.post('cards/pack', {cardsPack:{}})
// },

// {email: email, password: password}