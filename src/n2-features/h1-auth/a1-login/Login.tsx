import React, {ChangeEvent, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import st from './Login.module.css'
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {Input} from '../../../n1-main/m1-ui/Common/Input/Input';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {loginTC} from '../../../n1-main/m2-bll/login-reducer';
import {setError} from "../../../n1-main/m2-bll/app-reducer";

export const Login: React.FC = () => {
    //state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const dispatch = useDispatch();
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth);
    const error = useSelector<AppStoreType, string | null>(state => state.app.error);
    const isLoading = useSelector<AppStoreType, boolean>(state => state.app.isFetching);

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
        dispatch(setError(''));
        dispatch(loginTC({email, password, rememberMe}));
    }


    return (
        <div className={st.loginPage}>
            <div className={st.loginPageContain}>
                {/* {isLoading && <span className={st.isLoading}>loading</span>}
            {error && <span className={st.error}>{error}</span>} */}
                <h2>IT-Incubator</h2>

                <div className={st.loginContent}>
                    <h3>Sign In</h3>
                    <div className={st.inputContainer}>
                        <Input type={'email'}
                               value={email}
                               placeholder={'Email'}
                               onChange={onEmailInputChange}/>

                    </div>
                    <div className={st.inputContainer}>
                        <Input type={'password'}
                               value={password}
                               placeholder={'Password'}
                               onChange={onPasswordInputChange}/>
                    </div>
                    <div className={st.remMeFogotContain}>

            <span><input type={'checkbox'}
                         checked={rememberMe}
                         onChange={onRememberMeInputChange}/>
                Remember me</span>
                        <NavLink to={PATH.ENTER_NEW_PASS}>Forgot Password</NavLink>
                    </div>
                    <div className={st.buttonContainer}>
                        <Button onClick={onSubmitClick}
                                disabled={isLoading}>Login</Button>
                    </div>
                    <p>Don't have an account?</p>
                    <NavLink to={PATH.REGISTRATION}>Sing up</NavLink>
                </div>
            </div>
        </div>
    )
}


