import React, {useEffect, useState} from 'react';
import st from './Registration.module.css'
import SuperInputText from "../../../n1-main/m1-ui/Common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/Common/Button/Button";
import {ApiCards} from "../../../API/ApiCards";
import {addUserAC, authReducer} from "../../../n1-main/m2-bll/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";

export type setRegistrationType = {
    email: '',
    password1: '',
    password2: ''
}

export const Registration = () => {
    let [email, setEmail] = useState('')
    let [password1, setPassword1] = useState('')
    let [password2, setPassword2] = useState('')
    let [buttonOn, setbuttonOn] = useState(false)
    let[error,setError]=useState(false)

    let dispath = useDispatch()
    let loginForm = useSelector<AppStoreType, Array<setRegistrationType>>(state => state.auth)

    let onclickHandler = () => {
        setbuttonOn(true);
        if (password1 === password2) {
            setError(false)
            dispath(addUserAC(email, password1, password2))
        }else{
            setError(true)
            setTimeout(()=>{
                setError(false)
            },3000)
        }
        setEmail('')
        setPassword1('')
        setPassword2('')
    }

    useEffect(() => {

        ApiCards.addUser("Shashelephant@gmail.com", "223120Dilan-Bars211")
            .then((res) => {
                console.log(res.data)
            })
        // ApiCards.ping()
        //     .then((res)=>{
        //         console.log(res)
        //     })
    }, [])


    return (
        <div className={st.registrationPage}>
            <h1>REGISTRATION PAGE</h1>
            <SuperInputText value={email} onChangeText={setEmail}/>
            <SuperInputText value={password1} onChangeText={setPassword1}/>
            <SuperInputText value={password2} onChangeText={setPassword2}/>

            {error===true && <div className={st.PasswordError}>Check YOUR PASSWORD</div>}

            <Button children={'Send'} onClick={() => onclickHandler()}/>

            {buttonOn &&
            loginForm.map((m: setRegistrationType) => {
                return (
                    <div className={st.buttonOn}>
                        <div>Your Login={m.email}</div>
                        <div>Your Password={m.password1}</div>


                    </div>
                )
            })
            }
        </div>
    )
};
