import axios from 'axios';

let instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

export let ApiCardsCard = {
    getCards: (id: string, searchData: CardSearchDataType = {}) => {
        return instance.get(`cards/card?cardsPack_id=${id}`, {
            params: {
                ...searchData
            }
        })
    },
    AddCard: (card:addCardRequestType) => {
        return instance.post(`cards/card`, {card})
    },
    DeleteCard: (id: string) => {
        return instance.delete(`cards/card?id=${id}`)
    },
    /*UpdateCard: (id: string) => {
        return instance.put(`cards/card?cardsPack_id=${id}`, {card: {_id: id, question: 'UPDATED'}})
    },*/
    updateCard: (card:updateCardRequestType) => {
        return instance.put('cards/card', {card})
    }
}


//types

export type updateCardRequestType = {
        _id: string
        answer?: string
        answerImg?: string
        answerVideo?: string
        question?: string
        questionImg?: string
        questionVideo?: string
}
export type addCardRequestType = {
    cardsPack_id: string
    answer?: string
    answerImg?: string
    answerVideo?: string
    question?: string
    questionImg?: string
    questionVideo?: string
}



export type CardSearchDataType = {
    cardQuestion?: string
    sortCards?: string
    min?: number
    max?: number
    page?: number
    pageCount?: number
}