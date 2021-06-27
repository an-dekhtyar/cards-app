import React from 'react';
import {NavLink} from 'react-router-dom';
import st from './Login.module.css'
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';

export const Login: React.FC = () => {


    return (
        <div className={st.loginPage}>
            <h1>LOGIN PAGE</h1>
            <label>Email
                <input/>
            </label>
            <label>
                Password
                <input/>
            </label>
            <NavLink to={PATH.ENTER_NEW_PASS}>Forgot Password</NavLink>
            <button>Login</button>
            <p>Don't have an account?</p>
            <NavLink to={PATH.REGISTRATION}>Sing up</NavLink>
        </div>
    )
}


