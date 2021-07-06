import axios from 'axios';
import {LoginDataType} from '../n1-main/m2-bll/login-reducer';
import {cardPacksType} from "../n2-features/h1-auth/a3-profile/Profile";


let instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const ApiCardsPack = {

    GETCardsPack:()=>{
        return instance.get<cardPacksType>('cards/pack')
    },
    AddNewCardsPack:()=>{
        return instance.post('cards/pack', {cardsPack:{}})
    },
    DeleteCardsPack:(id:string)=>{
        return instance.delete(`cards/pack/?id=${id}`)
    },
    UpdateCardsPack:(id:string)=>{
        return instance.put(`cards/pack`,{cardsPack: {_id: id}})
    },

}