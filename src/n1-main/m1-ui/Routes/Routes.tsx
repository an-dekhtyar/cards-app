import React from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import {Registration, Profile, RestorePass, EnterNewPassContain, Test, Login} from "../../../n2-features";
import {Page404} from "../../m4-pages/a4-page404/Page404";
import {SearchTable} from '../../../n2-features/h2-cards/a1-search/SearchTable';
import {Cards} from "../../../n2-features/h1-auth/a3-profile/Cards";



export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PAGE_404:'/404',
    RESTORE_PASS:'/restore-pass',
    ENTER_NEW_PASS:'/new-pass',
    TEST:'/test',
    CARDS:'/cards',
    SEARCH_CARDS: '/searchCards'
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
            <Route path={PATH.CARDS} render={() => <Cards/>}/>
            <Route path={PATH.SEARCH_CARDS} render={() => <SearchTable/>}/>
            <Redirect from={'*'} to={PATH.PAGE_404}/>
        </Switch>

    </div>
);

