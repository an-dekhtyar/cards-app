import React from 'react';
import st from './Header.module.css'
import { NavLink } from 'react-router-dom'




export const Header = () => (
    <div className={st.header}>
        <div className={st.headerContain}>
            <NavLink to={'/login'} className={st.headerLink}>Login</NavLink>
            <NavLink to={'/registration'} className={st.headerLink}>Registration</NavLink>
            <NavLink to={'/profile'} className={st.headerLink}>Profile</NavLink>
            <NavLink to={'/404'} className={st.headerLink}>404</NavLink>
            <NavLink to={'/restore-pass'} className={st.headerLink}>Restore Password</NavLink>
            <NavLink to={'/new-pass'} className={st.headerLink}>Enter new Password</NavLink>
            <NavLink to={'/test'} className={st.headerLink}>Test Super Components</NavLink>
        </div>
    </div>
);

