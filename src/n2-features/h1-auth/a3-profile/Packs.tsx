import React, {useEffect, useState} from 'react';
import st from './Profile.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {Preloader} from '../../../n1-main/m1-ui/Common/Preloader/Preloader';
import {AddNewCardThunk, CreatePackIdThunk, GetCardsThunk} from '../../../n1-main/m2-bll/cards-reducer';
import {GETPacksThunk, UpdatePackThunk} from '../../../n1-main/m2-bll/packs-reducer';
import {DeleteCardsPackModal} from '../../../assets/ModalWindows/DeleteCardsPackModal';
import {UpdateCardsPackModal} from '../../../assets/ModalWindows/UpdateCardsPackProfileModal';
import {PackType} from '../../../API/ApiCardsPack';


export const Packs = () => {
    let dispatch = useDispatch();
    let packs = useSelector<AppStoreType, Array<PackType>>(state => state.packs.packs);
    let UserId = useSelector<AppStoreType, string | null>(state => state.profile._id);
    let [preloader, setPreloader] = useState(false);

    let [showDeleteModal, setShowDeleteModal] = useState(false);
    let [idForModal, setIdForModal] = useState('');
    let [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

    useEffect(() => {
        if (UserId) {
            debugger;
            dispatch(GETPacksThunk(UserId))
        }
    }, [])
    const AddNewCard = () => {
        if (UserId) {
            dispatch(AddNewCardThunk(UserId, setPreloader))
        } else {
            //@ts-ignore
            dispatch(CreatePackIdThunk(UserId))
            if (UserId) {
                dispatch(GETPacksThunk(UserId))
            }
            // return <Redirect to={PATH.PROFILE}/>
        }
        // dispatch(AddNewCardsPackThunk(name,setPreloader))
    }
    const DeleteCard = (id: string) => {
        console.log(id)
        setShowDeleteModal(true)
        setIdForModal(id)
        // dispatch(DeleteCardsPackThunk(id, setPreloader))
    }
    const UpdateCard = (id: string) => {
        console.log(id)
        setShowUpdateProfileModal(true)
        setIdForModal(id)
        dispatch(UpdatePackThunk(id, setPreloader))
    }

    const GetCards = (id: string, cardsCount: number) => {
        dispatch(GetCardsThunk(id, setPreloader))
        if (cardsCount === 0) {
            // dispatch(AddNewCardThunk(id, setPreloader))
            dispatch(CreatePackIdThunk(id))
        }
    }

    return (
        <div className={st.profilePage}>
            {showDeleteModal && <DeleteCardsPackModal idForModal={idForModal} setShowDeleteModal={setShowDeleteModal}
                                                      setPreloader={setPreloader}/>}
            {showUpdateProfileModal &&
            <UpdateCardsPackModal idForModal={idForModal} setShowUpdateProfileModal={setShowUpdateProfileModal}
                                  setPreloader={setPreloader}/>}

            <Button children={'add new card'} onClick={AddNewCard}/>
            <div className={st.profile}>{
                packs !== undefined ?
                    packs.map((m) => {
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
                                                children={'Show Cards'}
                                                onClick={() => GetCards(m._id, m.cardsCount)}/>
                                        </NavLink>
                                    </li>
                                </ul>

                            </div>
                        )
                    })
                    :
                    <div>{preloader && <Preloader/>}</div>
            }</div>

            {/*<Table data={dataForTable.cardPacks}/>*/}
        </div>)
}








