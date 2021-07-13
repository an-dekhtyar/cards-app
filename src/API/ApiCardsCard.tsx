import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export let ApiCardsCard = {
    getCards: (id: string) => {
        return instance.get(`cards/card?cardsPack_id=${id}`)
    },
    AddCard: (CardsPackId: string, name: string) => {
        return instance.post(`cards/card`, {card: {cardsPack_id: CardsPackId}})
    },
    DeleteCard: (id: string) => {
        return instance.delete(`cards/card?id=${id}`)
    },
    UpdateCard: (id: string) => {
        return instance.put(`cards/card?cardsPack_id=${id}`, {card: {_id: id, question: 'UPDATED'}})
    },
}


//types