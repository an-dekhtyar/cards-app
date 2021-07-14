import axios from 'axios';


let instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const ApiCardsRating = {
    setRatingCard(grade: number, card_id: string) {
        return instance.put('cards/grade', {grade, card_id})
    }
}