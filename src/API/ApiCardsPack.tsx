import axios from 'axios';
import {CardPacksType} from '../n1-main/m2-bll/search-reducer';


let instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const ApiCardsPack = {

    GETCardsPack: (searchParams: SearchParamsType = {}) => {
        return instance.get<CardPacksType>('cards/pack', {
            params: {
                ...searchParams
            }
        })
    },
    AddNewCardsPack: () => {
        return instance.post('cards/pack', {cardsPack: {}})
    },
    DeleteCardsPack: (id: string) => {
        return instance.delete(`cards/pack/?id=${id}`)
    },
    UpdateCardsPack: (id: string) => {
        return instance.put(`cards/pack`, {cardsPack: {_id: id}})
    },

}

//types

export type SearchParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}