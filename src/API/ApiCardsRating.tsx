import axios from 'axios';


let instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
})

export const ApiCardsRating = {
    setRatingCard(grade: number, card_id: string) {
        return instance.put('cards/grade', {grade, card_id})
    }
}