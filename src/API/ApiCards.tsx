import React from 'react';
import axios from "axios";


let instance=axios.create({
    baseURL:"http://localhost:7542/2.0/",
    withCredentials:true,
    // headers:{
    //     'API-KEY': '0e5dc50f-7e9f-4eda-9157-a63c5026aaad2'
    // }
})

// type AddUserType={
//
// }



export const ApiCards={
    ping(){
        return instance.get(`ping`)
    },
    addUser(email: string,password: string){
        return instance.post('/auth/register',{email:email, password:password})
    },

}