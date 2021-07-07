import React, {useEffect} from 'react';
import {Button} from "../../../n1-main/m1-ui/Common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {authTC, LoginReducerStateType, logOutTC} from "../../../n1-main/m2-bll/login-reducer";
import {Redirect} from "react-router-dom";
import { PATH } from '../../../n1-main/m1-ui/Routes/Routes';
import { AppStoreType } from '../../../n1-main/m2-bll/store';
import {UserDataType} from "../../../n1-main/m2-bll/profile-reducer";


export const Profile = () => {

    const dispatch = useDispatch()
    const userData = useSelector<AppStoreType, UserDataType>(state => state.profile)
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)

    const {_id, name, avatar, email, publicCardPacksCount} = userData



    const logout = () => {
        dispatch(logOutTC())
}

   if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }



return (
    <div>
            <div>My name is:{name}</div>
            <div>My id is: {_id}</div>
            <div>My email is: {email}</div>
            <div>My avatar is: {avatar}</div>
            <div>My public card count is: {publicCardPacksCount}</div>

        <Button onClick={logout} >Log out</Button>
        <Button disabled>Update Profile</Button>
    </div>)
};

