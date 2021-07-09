import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import {Button} from "../../../n1-main/m1-ui/Common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {authTC, LoginReducerStateType, logOutTC} from "../../../n1-main/m2-bll/login-reducer";
import {Redirect} from "react-router-dom";
import { PATH } from '../../../n1-main/m1-ui/Routes/Routes';
import { AppStoreType } from '../../../n1-main/m2-bll/store';
import {changeUserDataTC, UserDataType} from "../../../n1-main/m2-bll/profile-reducer";
import st from './Profile.module.css'
import { Input } from '../../../n1-main/m1-ui/Common/Input/Input';
import profileLogo from '../../../assets/images/profileLogo.png'
import {Preloader} from "../../../n1-main/m1-ui/Common/Preloader/Preloader";
import { EditableSpan } from './Editablespan';
import { Cards } from './Cards';
export const Profile = () => {

    const dispatch = useDispatch()
    const userData = useSelector<AppStoreType, UserDataType>(state => state.profile)
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
    const isFetching = useSelector<AppStoreType, boolean>(state => state.app.isFetching)

    const {_id, name, avatar, email, publicCardPacksCount} = userData

    console.log(avatar)

    const logout = () => {
        dispatch(logOutTC())
    }

    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    const onChangeName = (newName:string)=> {
            dispatch(changeUserDataTC(newName, avatar))
            }
    const onChangeAvatar = (avatar:string)=> {
        dispatch(changeUserDataTC(name, avatar))
    }


    return (
        <div className={st.profilePage}>
            <div className={st.profileContain}>

                {isFetching
                    ?
                <>
                <div className={st.leftBlock}>
                    <div className={st.info}>

                        <div className={st.logo} >
                            <img className={st.logo} src={avatar === "Avatar is not defined" || "Add link to add ava!" ? profileLogo : avatar}/>
                        </div>
                        <div>ID: {_id}</div>
                        <div>Email: {email}</div>
                        <div>My public card count is: {publicCardPacksCount}</div>

                        <EditableSpan value={avatar} onChange={onChangeAvatar}/>
                        {/*<Button disabled>Update Profile</Button>*/}
                    </div>
                    <div className={st.range}>Range</div>
                    <div className={st.button}>

                        <Button onClick={logout} >Log out</Button>
                    </div>
                </div>

                <div className={st.rightBlock}>
                    <div className={st.input}>
                        <div>Packs list <EditableSpan value={name} onChange={onChangeName}/></div>
                        <Input placeholder={'Search'}/>
                    </div>
                    <div className={st.table}>
                        <Cards/>
                    </div>
                    <div className={st.pagination}>Pagination</div>
                </div>
                </> : <Preloader/>
                }






                {/* <div>My name is:{name}</div>


            <div>My avatar is: {avatar}</div>
           }

        {/* <Button onClick={logout} >Log out</Button>
        <Button disabled>Update Profile</Button> */}
            </div>
        </div>)
};









//------------------------------------------------------------------

