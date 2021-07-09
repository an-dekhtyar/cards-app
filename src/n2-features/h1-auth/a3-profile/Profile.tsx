import React, {useEffect} from 'react';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logOutTC} from '../../../n1-main/m2-bll/login-reducer';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeUserDataTC, UserDataType} from '../../../n1-main/m2-bll/profile-reducer';
import st from './Profile.module.css'
import profileLogo from '../../../assets/images/profileLogo.png'
import {Preloader} from '../../../n1-main/m1-ui/Common/Preloader/Preloader';
import {EditableSpan} from './Editablespan';
import {Search} from '../../h2-cards/a1-search/Search';
import {SearchTablePacks} from '../../h2-cards/a1-search/SearchTablePacks';
import {SearchPaginator} from '../../h2-cards/a1-search/SearchPaginator';
import {changeSearchParams, GETCardsPackTC} from '../../../n1-main/m2-bll/search-reducer';
import {SearchDoubleRange} from '../../h2-cards/a1-search/SearchDoubleRange';

export const Profile = () => {

    const dispatch = useDispatch()
    const userData = useSelector<AppStoreType, UserDataType>(state => state.profile)
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
    const isFetching = useSelector<AppStoreType, boolean>(state => state.app.isFetching)
    const user_id = useSelector<AppStoreType, string | null>(state => state.profile._id)
    useEffect(() => {
        dispatch(changeSearchParams({user_id: user_id?user_id:undefined}))
        dispatch(GETCardsPackTC(true, {user_id: user_id?user_id:undefined}))
    }, [])

    const {_id, name, avatar, email, publicCardPacksCount} = userData

    console.log(avatar)

    const logout = () => {
        dispatch(logOutTC())
    }

    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    const onChangeName = (newName: string) => {
        dispatch(changeUserDataTC(newName, avatar))
    }
    const onChangeAvatar = (avatar: string) => {
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

                                <div className={st.logo}>
                                    <img className={st.logo}
                                         src={avatar === 'Avatar is not defined' || 'Add link to add ava!' ? profileLogo : avatar}/>
                                </div>
                                <div>ID: {_id}</div>
                                <div>Email: {email}</div>
                                <div>My public card count is: {publicCardPacksCount}</div>

                                <EditableSpan value={avatar} onChange={onChangeAvatar}/>
                                {/*<Button disabled>Update Profile</Button>*/}
                            </div>
                            <div className={st.range}><SearchDoubleRange/></div>
                            <div className={st.button}>

                                <Button onClick={logout}>Log out</Button>
                            </div>
                        </div>

                        <div className={st.rightBlock}>
                            <div className={st.input}>
                                <div>Packs list <EditableSpan value={name} onChange={onChangeName}/></div>
                                <Search/>
                            </div>
                            <SearchTablePacks/>
                            <div className={st.pagination}><SearchPaginator/></div>
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


/*
import React, {useEffect, useState} from 'react';
import st from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    AddNewCardsPackThunk,
    DeleteCardsPackThunk,
    GETCardsPackThunk,
    InitialProfileReducerType,
    UpdateCardsPackThunk
} from "../../../n1-main/m2-bll/profile-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/Routes/Routes";
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {Preloader} from "../../../n1-main/m1-ui/Common/Preloader/Preloader";
import {
    AddNewCardThunk,
    CreateCardsPackIdThunk,
    GetCardsCardThunk,
    InitialCardProfileReducerType
} from '../../../n1-main/m2-bll/profileCards-reducer';
import {stat} from "fs";


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
    let dataForTable = useSelector<AppStoreType, InitialProfileReducerType>(state => state.profile)
    let cardsProfile = useSelector<AppStoreType, InitialCardProfileReducerType>(state => state.cardProfile)
    let [preloader, setPreloader] = useState(false)

    useEffect(() => {
        console.log('useEffect')
        dispatch(GETCardsPackThunk(setPreloader))
    }, [])
    const AddNewCard = () => {
        dispatch(AddNewCardsPackThunk(setPreloader))
    }
    const DeleteCard = (id: string) => {
        console.log(id)
        dispatch(DeleteCardsPackThunk(id, setPreloader))
    }
    const UpdateCard = (id: string) => {
        console.log(id)
        dispatch(UpdateCardsPackThunk(id, setPreloader))
    }

    const GetCardsCard = (id: string, cardsCount: number) => {
        dispatch(GetCardsCardThunk(id, setPreloader))
        if (cardsCount === 0) {
            // dispatch(AddNewCardThunk(id, setPreloader))
            dispatch(CreateCardsPackIdThunk(id))
        }
    }

    return (
        <div className={st.profilePage}>
            <h1>PROFILE PAGE</h1>

            <Button children={'add new card'} onClick={AddNewCard}/>
            <div className={st.profile}>{
                dataForTable !== undefined ?
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
                                        <p></p>
                                        <Button children={'Delete'} onClick={() => DeleteCard(m._id)}/>
                                        <Button children={'Update'} onClick={() => UpdateCard(m._id)}/>
                                        <NavLink to={PATH.CARDS} className={st.headerLink}>
                                            <Button
                                                children={'Show Cards'} onClick={() => GetCardsCard(m._id, m.cardsCount)}/>
                                        </NavLink>
                                    </li>
                                </ul>

                            </div>
                        )
                    })
                    :
                    <div>{preloader && <Preloader/>}</div>
            }</div>

            {/!*<Table data={dataForTable.cardPacks}/>*!/}
        </div>)
}






*/



