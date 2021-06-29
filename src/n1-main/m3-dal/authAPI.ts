import axios from "axios"

const instance = axios.create({
        baseURL: 'https://neko-back.herokuapp.com/2.0',
        withCredentials: true,
    }
)
export const authAPI = {
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
    }
}




