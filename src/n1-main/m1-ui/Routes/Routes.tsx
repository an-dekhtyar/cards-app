import React from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import {Registration, Profile, RestorePass, EnterNewPassContain, Test, Login} from "../../../n2-features";
import { ProfileCards } from '../../../n2-features/h1-auth/a3-profile/ProfileCards';
import {Page404} from "../../m4-pages/a4-page404/Page404";



export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PAGE_404:'/404',
    RESTORE_PASS:'/restore-pass',
    ENTER_NEW_PASS:'/new-pass',
    TEST:'/test',
    CARDS:'/cards'
}


export const Routes = () => (
    <div>
        <Switch>

            <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
            <Route path={PATH.LOGIN} render={() => <Login/>}/>
            <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
            <Route path={PATH.PROFILE} render={() => <Profile/>}/>
            <Route path={PATH.RESTORE_PASS} render={() => <RestorePass/>}/>
            <Route path={PATH.ENTER_NEW_PASS} render={() => <EnterNewPassContain/>}/>
            <Route path={PATH.TEST} render={() => <Test/>}/>
            <Route path={PATH.PAGE_404} render={() => <Page404/>}/>
            <Route path={PATH.CARDS} render={() => <ProfileCards/>}/>

            <Redirect from={'*'} to={PATH.PAGE_404}/>
        </Switch>

    </div>
);

