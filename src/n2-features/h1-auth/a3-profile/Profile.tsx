import React, {useEffect} from 'react';
import st from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AddNewCardsPackThunk, GETCardsPackThunk} from "../../../n1-main/m2-bll/profile-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/Routes/Routes";
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';

export type cardPacksType = {
    cardPacks: Array<userType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type userType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export const Profile = () => {
    let dispatch = useDispatch()
    // @ts-ignore
    let dataForTable = useSelector<AppStoreType, cardPacksType>(state => state.profile)
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth);

    useEffect(() => {
        dispatch(GETCardsPackThunk())
    }, [])
    console.log(dataForTable)
    if (!isAuth) {
        return <Redirect to={PATH.REGISTRATION}/>
    }
    const AddNewCard=()=>{
        dispatch(AddNewCardsPackThunk())
    }
    return (
        <div className={st.profilePage}>
            <h1>PROFILE PAGE</h1>
            <Button children={'add new card'} onClick={AddNewCard}/>
            <div className={st.profile}>{
                dataForTable.cardPacks.map((m) => {
                    return (
                        <div>
                            <ul>
                                <li>

                                    <div>ID: {m._id}</div>
                                    <div>USER-ID: {m.user_id}</div>
                                    <div>NAME: {m.name}</div>
                                    <div>CREATED: {m.created}</div>
                                    <div>UPDATED: {m.updated}</div>
                                    <div>cardsCount: {m.cardsCount}</div>

                                    {/*_id: "5eb6cef840b7bf1cf0d8122d"*/}
                                    {/*user_id: "5eb543f6bea3ad21480f1ee7"*/}
                                    {/*name: "no Name"*/}
                                    {/*created: "2020-05-09T15:40:40.339Z"*/}
                                    {/*updated: "2020-05-09T15:40:40.339Z"*/}
                                </li>
                            </ul>
                        </div>
                    )
                })
            }</div>

            {/*<Table data={dataForTable.cardPacks}/>*/}
        </div>)
}

