import React, {useEffect, useState} from 'react';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import btn from '../../../n1-main/m1-ui/Common/Button/Button.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {logOutTC} from '../../../n1-main/m2-bll/login-reducer';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {toggleEditMode, UserDataType} from '../../../n1-main/m2-bll/profile-reducer';
import st from './Profile.module.css'
import profileLogo from '../../../assets/images/profileLogo.png'
import {Packs} from './Packs';
import {Preloader} from '../../../n1-main/m1-ui/Common/Preloader/Preloader';

import {Search} from '../../h2-cards/a1-search/Search';
import {SearchPaginator} from '../../h2-cards/a1-search/SearchPaginator';
import {SearchDoubleRange} from '../../h2-cards/a1-search/SearchDoubleRange';
import {GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';


import {PageCountSelect} from '../../h2-cards/a1-search/PageCountSelect';
import {MyAllToggle} from '../../h2-cards/a1-search/MyAllToggle';
import {AddNewPackProfileModal} from '../../../assets/ModalWindows/AddNewPackModal/AddNewPackProfileModal';
import {EditProfile} from "../a6-edit-profile/EditProfile";

export const Profile = () => {
        const dispatch = useDispatch()

        const userData = useSelector<AppStoreType, UserDataType>(state => state.profile)
        const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
        const isFetching = useSelector<AppStoreType, boolean>(state => state.app.isFetching)
        const editMode = useSelector<AppStoreType, boolean>(state => state.profile.editMode)
        let [showAddPackModal, setShowAddPackModal] = useState(false);
        const [isInitialized, setIsInitialized] = useState<boolean>(false);

        if (!isInitialized && isFetching) {
            setIsInitialized(true);
        }

        useEffect(() => {
            dispatch(GetPacksTC(true))
        }, [])

        const {name, avatar, email, publicCardPacksCount} = userData


        const logout = () => {
            dispatch(logOutTC())
        }
        const onClickEditMode = () => {
            dispatch(toggleEditMode(true))
        }


        if (!isAuth) {
            return <Redirect to={PATH.LOGIN}/>
        }
        const AddNewPack = () => {
            setShowAddPackModal(true);
        }

        return (
            <div className={st.profilePage}>
                <div className={st.profileContain}>
                    <>
                        <div className={st.leftBlock}>
                            <div className={st.info}>
                                <div className={st.logo}>
                                    <img className={st.logo}
                                         src={avatar === 'Avatar is not defined' || 'Add link to add ava!' ? profileLogo : avatar}/>
                                </div>
                                <div>Front-end developer</div>
                                <Button className={btn.editProfileBtn} onClick={onClickEditMode}>Edit
                                    profile</Button>
                                <div>My public card count is: {publicCardPacksCount}</div>
                            </div>
                            <div className={st.range}><SearchDoubleRange/><MyAllToggle/></div>
                            <div className={st.button}>

                                <Button onClick={logout} disabled={!isFetching}>Log out</Button>
                            </div>
                        </div>

                        <div className={st.rightBlock}>
                            <div className={st.input}>
                                    <span>
                                        <Search/>
                                    </span>
                                <Button children={'add new pack'} onClick={AddNewPack} disabled={!isFetching}/>
                            </div>
                            {isInitialized ?
                                <div className={st.table}>
                                    <Packs/>
                                </div>
                                :
                                <Preloader/>}

                            <div className={st.pagination}>
                                <SearchPaginator/>
                                <PageCountSelect/>
                            </div>
                        </div>
                        {editMode && <EditProfile userAvatar={avatar} profileLogo={profileLogo} userEmail={email} userName={name}/>}
                        {showAddPackModal &&
                        <AddNewPackProfileModal setAddNewCardModal={setShowAddPackModal}
                                                />}
                    </>
                </div>


            </div>)


    }
;

