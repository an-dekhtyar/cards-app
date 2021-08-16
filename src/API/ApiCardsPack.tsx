import axios from 'axios';


let instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

export const ApiCardsPack = {

    GetPack: (searchParams: SearchParamsType = {}) => {
        return instance.get<ResponsePacksType>('cards/pack', {
            params: {
                ...searchParams
            }
        })
    },
    AddNewPack: (name: string) => {
        return instance.post('cards/pack', {cardsPack: {name}})
    },
    DeletePack: (id: string) => {
        return instance.delete(`cards/pack/?id=${id}`)
    },
    UpdatePack: (id: string, name: string) => {
        return instance.put(`cards/pack`, {cardsPack: {_id: id, name}})
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

export type PackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type ResponsePacksType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
