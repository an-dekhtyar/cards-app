import React, {useState} from 'react';
import st from './Registration.module.css'
import SuperInputText from "../../../n1-main/m1-ui/Common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/Common/Button/Button";

export type setRegistrationType = {
    login: '',
    password1: '',
    password2: ''
}

export const Registration = () => {
    let [login, setLogin] = useState('')
    let [password1, setPassword1] = useState('')
    let [password2, setPassword2] = useState('')
    let [loginForm, setloginForm] = useState<any>([])
    let [buttonOn, setbuttonOn] = useState(false)
    console.log(loginForm)
    let onclickHandler = () => {
        console.log(login, password1, password2)
        setbuttonOn(true);
        let newItemLoginForm = {login: login, password1: password1, password2: password2}
        setloginForm([...loginForm, newItemLoginForm])
        setLogin('')
        setPassword1('')
        setPassword2('')
    }


    return (
        <div className={st.registrationPage}>
            <h1>REGISTRATION PAGE</h1>
            <SuperInputText value={login} onChangeText={setLogin}/>
            <SuperInputText value={password1} onChangeText={setPassword1}/>
            <SuperInputText value={password2} onChangeText={setPassword2}/>

            <Button children={'Send'} onClick={() => onclickHandler()}/>
            { buttonOn &&
                loginForm.map((m:setRegistrationType)=>{
                    return(
                        <div className={st.buttonOn}>
                            <div>Your Login={m.login}</div>
                            <div>Your Password={m.password1}</div>
                        </div>
                    )
                })
            }
        </div>
    )
};
