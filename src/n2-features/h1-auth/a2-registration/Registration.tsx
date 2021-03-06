import React, {useEffect, useState} from 'react';
import st from './Registration.module.css'
import {Input} from "../../../n1-main/m1-ui/Common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/Common/Button/Button";
import {ApiCards} from "../../../API/ApiCards";
import {addUserAC, addUserACThunk, registrationReducer} from "../../../n1-main/m2-bll/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {Redirect} from 'react-router-dom';
import {Preloader} from "../../../n1-main/m1-ui/Common/Preloader/Preloader";
import button from './../../../n1-main/m1-ui/Common/Button/Button.module.css'

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
    let [error, setError] = useState('')
    let [errorFromServer, setErrorFromServer] = useState('')
    let [redirect, setRedirect] = useState(false)
    let [preloader, setPreloader] = useState(false)

    let dispath = useDispatch()
    let loginForm = useSelector<AppStoreType, Array<setRegistrationType>>(state => state.registration)
    let statusLoginForm = loginForm.find((f) => f.email)

    let onclickHandler = () => {
        setbuttonOn(true);
        if (password1 === password2) {
            setError('')
            // dispath(addUserAC(email, password1, password2))
            dispath(addUserACThunk(email, password1, setRedirect, setPreloader, setErrorFromServer))
        } else {
            setError('Check YOUR PASSWORD')
            setTimeout(() => {
                setError('')
            }, 3000)
        }

        setEmail('')
        setPassword1('')
        setPassword2('')
    }

    let onResetHandler = () => {
        setEmail('')
        setPassword1('')
        setPassword2('')
        setError('')
    }

    useEffect(() => {
        // ApiCards.ping()
        //     .then((res)=>{
        //         console.log(res)
        //     })
    }, [])


    return (
        <div className={st.registrationPage}>
            <div className={st.registrationContain}>
                {preloader && <Preloader/>}
                {redirect && <Redirect to={'/login'}/>}
                <h2>IT-Incubator</h2>
                <div className={st.registrationContent}>
                    <h3>Sing Up</h3>
                    <div className={st.inputContainer}>
                        <Input value={email} onChangeText={setEmail} placeholder={'Email'}/>
                    </div>
                    <div className={st.inputContainer}>
                        <Input value={password1} onChangeText={setPassword1} placeholder={'Password'}/>
                    </div>
                    <div className={st.inputContainer}>
                        <Input value={password2} onChangeText={setPassword2} placeholder={'Confirm password'}/>
                    </div>

                    <div className={st.PasswordError}>{error}</div>
                    <div className={st.PasswordError}>{errorFromServer}</div>

                    <div className={st.buttonContainer}>
                        <Button className={button.registrationCancel} children={'Cancel'} onClick={onResetHandler}/>
                        <Button children={'Send'} onClick={() => onclickHandler()}/>
                    </div>
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
            </div>
        </div>
    )
};


//====================================================================================================================
// import React, {useEffect, useState} from 'react';
// import st from './Registration.module.css'
// import SuperInputText from "../../../n1-main/m1-ui/Common/Input/Input";
// import {Button} from "../../../n1-main/m1-ui/Common/Button/Button";
// import {ApiCards} from "../../../API/ApiCards";
// import {addUserAC, addUserACThunk, registrationReducer} from "../../../n1-main/m2-bll/auth-reducer";
// import {useDispatch, useSelector} from "react-redux";
// import {AppStoreType} from "../../../n1-main/m2-bll/store";
// import {Redirect} from 'react-router-dom';
// import {Preloader} from "../../../n1-main/m1-ui/Common/Preloader/Preloader";
//
// export type setRegistrationType = {
//     email: '',
//     password1: '',
//     password2: ''
// }
//
// export const Registration = () => {
//     let [email, setEmail] = useState('')
//     let [password1, setPassword1] = useState('')
//     let [password2, setPassword2] = useState('')
//     let [buttonOn, setbuttonOn] = useState(false)
//     let [error, setError] = useState('')
//     let [errorFromServer, setErrorFromServer] = useState('')
//     let [redirect, setRedirect] = useState(false)
//     let [preloader, setPreloader] = useState(false)
//
//     let dispath = useDispatch()
//     let loginForm = useSelector<AppStoreType, Array<setRegistrationType>>(state => state.auth)
//     let statusLoginForm = loginForm.find((f) => f.email)
//
//     let onclickHandler = () => {
//         setbuttonOn(true);
//         if (password1 === password2) {
//             setError('')
//             // dispath(addUserAC(email, password1, password2))
//             dispath(addUserACThunk(email, password1, setRedirect, setPreloader, setErrorFromServer))
//         } else {
//             setError('Check YOUR PASSWORD')
//             setTimeout(() => {
//                 setError('false')
//             }, 3000)
//         }
//         if (password1.length < 7) {
//             setError('Password must be more than 7 characters...')
//         }
//         setEmail('')
//         setPassword1('')
//         setPassword2('')
//     }
//
//     useEffect(() => {
//         // ApiCards.ping()
//         //     .then((res)=>{
//         //         console.log(res)
//         //     })
//     }, [])
//     console.log(statusLoginForm)
//
//     return (
//         <div className={st.registrationPage}>
//             {preloader && <Preloader/>}
//             {redirect && <Redirect to={'/login'}/>}
//             <h1>REGISTRATION PAGE</h1>
//             <SuperInputText value={email} onChangeText={setEmail} placeholder={'Enter your EMAIL'}/>
//             <SuperInputText value={password1} onChangeText={setPassword1} placeholder={'Enter your PASSWORD'}/>
//             <SuperInputText value={password2} onChangeText={setPassword2} placeholder={'Enter your PASSWORD AGAIN'}/>
//
//             <div className={st.PasswordError}>{error}</div>
//             <div className={st.PasswordError}>{errorFromServer}</div>
//             <Button children={'Send'} onClick={() => onclickHandler()}/>
//
//             {buttonOn &&
//             loginForm.map((m: setRegistrationType) => {
//                 return (
//                     <div className={st.buttonOn}>
//                         <div>Your Login={m.email}</div>
//                         <div>Your Password={m.password1}</div>
//                     </div>
//                 )
//             })
//             }
//         </div>
//     )
// };
