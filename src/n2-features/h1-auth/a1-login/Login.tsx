import React, {ChangeEvent, useState} from 'react';
import {NavLink} from 'react-router-dom';
import st from './Login.module.css'
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import SuperInputText from '../../../n1-main/m1-ui/Common/Input/Input';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';

export const Login: React.FC = () => {
    const [email, setEmail] = useState(useSelector<AppStoreType, string>(state => state.login.email))
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(useSelector<AppStoreType, boolean>(state => state.login.rememberMe))

    const onEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const onRememberMeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked);
    }

    return (
        <div className={st.loginPage}>
            <h1>LOGIN PAGE</h1>
            <label>Email <SuperInputText type={'email'}
                                value={email}
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
            <Button>Login</Button>
            <p>Don't have an account?</p>
            <NavLink to={PATH.REGISTRATION}>Sing up</NavLink>
        </div>
    )
}


