
import axios from 'axios';
import {LoginDataType} from '../n1-main/m2-bll/login-reducer';


let instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const ApiCards = {
    ping() {
        return instance.get(`ping`)
    },
    addUser(email: string, password: string) {
        return instance.post<RegistrationType>('/auth/register', {email: email, password: password})
    },
    auth(){
        return instance.post<LoginResponseType>('/auth/me', {})
    },

    login(data: LoginDataType) {
        return instance.post<LoginResponseType>('/auth/login', {...data})
    },
    logout(){
        return instance.delete<LoginResponseType>('/auth/me', {})
    },
    getInstruction(email: string) {
        return instance.post('auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px"> To change your password, please follow the link:<a href='http://localhost:3000/#/new-pass/$token$'>link</a></div>`
        })
    },
    setNewPassword(newPassword: string, token: string) {
        return instance.post('auth/set-new-password',{
                password: newPassword,
                resetPasswordToken: token
            },
        )
    },

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
    avatar: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

type RegistrationType = {
    addedUser: {}
    error?: string,
}