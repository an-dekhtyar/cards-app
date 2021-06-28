import React from 'react';
import axios from 'axios';
import {LoginDataType} from '../n1-main/m2-bll/login-reducer';


let instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
    // headers:{
    //     'API-KEY': '0e5dc50f-7e9f-4eda-9157-a63c5026aaad2'
    // }
})

export const ApiCards = {
    ping() {
        return instance.get(`ping`)
    },
    addUser(email: string, password: string) {
        return instance.post('/auth/register', {email: email, password: password})
    },
    login(data: LoginDataType) {
        return instance.post<LoginResponseType>('/auth/login', {...data})
    }

}
// {
//     email: "nya-admin@nya.nya"
//     password: "1qazxcvBG"
// }


//types

export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

