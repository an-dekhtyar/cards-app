import React, {ChangeEvent, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import st from './Login.module.css'
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import SuperInputText from '../../../n1-main/m1-ui/Common/Input/Input';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {loginTC, setError} from '../../../n1-main/m2-bll/login-reducer';
import {Preloader} from "../../../n1-main/m1-ui/Common/Preloader/Preloader";

export const Login: React.FC = () => {

    //state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const dispatch = useDispatch();
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth);
    const error = useSelector<AppStoreType, string | null>(state => state.login.error);
    const isLoading = useSelector<AppStoreType, boolean>(state => state.login.isLoading);

    if (isAuth) {
        return <Redirect to={PATH.PROFILE}/>
    }

    //functions
    const onEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }
    const onPasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }
    const onRememberMeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked);
    }
    const onSubmitClick = () => {
        dispatch(setError(null));
        dispatch(loginTC({email, password, rememberMe}));
    }

    return (
        <div className={st.loginPage}>
            <h1>LOGIN PAGE</h1>
            {isLoading && <Preloader/>}
            {error && <span className={st.error}>{error}</span>}
            <label>Email <SuperInputText type={'email'}
                                         value={email}
                                         placeholder={'example@gmail.com'}
                                         onChange={onEmailInputChange}/>
            </label>
            <label>
                Password <SuperInputText type={'password'}
                                         value={password}
                                         onChange={onPasswordInputChange}/>
            </label>
            <label>Remember me <input type={'checkbox'}
                                      checked={rememberMe}
                                      onChange={onRememberMeInputChange}/>
            </label>
            <NavLink to={PATH.ENTER_NEW_PASS}>Forgot Password</NavLink>
            <Button onClick={onSubmitClick}
                    disabled={isLoading}>Login</Button>
            <p>Don't have an account?</p>
            <NavLink to={PATH.REGISTRATION}>Sing up</NavLink>
        </div>
    )
}


