import React from 'react';
import st from './Header.module.css'
import { NavLink } from 'react-router-dom'
import {PATH} from "../Routes/Routes";




export const Header = () => (
    <div className={st.header}>
        <div className={st.headerContain}>
            <NavLink to={PATH.LOGIN} className={st.headerLink}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION} className={st.headerLink}>Registration</NavLink>
            <NavLink to={PATH.PROFILE} className={st.headerLink}>Profile</NavLink>
            <NavLink to={PATH.PAGE_404} className={st.headerLink}>404</NavLink>
            <NavLink to={PATH.RESTORE_PASS} className={st.headerLink}>Restore Password</NavLink>
            <NavLink to={PATH.ENTER_NEW_PASS} className={st.headerLink}>Enter new Password</NavLink>
            <NavLink to={PATH.TEST} className={st.headerLink}>Test Super Components</NavLink>
            <NavLink to={PATH.SEARCH_CARDS} className={st.headerLink}>Search</NavLink>
        </div>
    </div>
);

