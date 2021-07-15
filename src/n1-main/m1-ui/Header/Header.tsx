import React from 'react';
import st from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {PATH} from '../Routes/Routes';


export const Header = () => (
    <div className={st.header}>
        <NavLink to={PATH.LOGIN} activeClassName={st.active}>Login</NavLink>
        <NavLink to={PATH.REGISTRATION} activeClassName={st.active}>Registration</NavLink>
        <NavLink to={PATH.PROFILE} activeClassName={st.active}>Profile</NavLink>
        <NavLink to={PATH.PAGE_404} activeClassName={st.active}>404</NavLink>
        <NavLink to={PATH.RESTORE_PASS} activeClassName={st.active}>Restore Password</NavLink>
        <NavLink to={PATH.ENTER_NEW_PASS} activeClassName={st.active}>Enter new Password</NavLink>
        <NavLink to={PATH.TEST} activeClassName={st.active}>Test Super Components</NavLink>
        <NavLink to={PATH.SEARCH_CARDS} activeClassName={st.active}>Search</NavLink>
        <NavLink to={PATH.LEARN} activeClassName={st.active}>Learn</NavLink>
    </div>
);

