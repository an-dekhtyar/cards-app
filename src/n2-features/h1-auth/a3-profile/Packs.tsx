import React, {useState} from 'react';
import st from './Profile.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {Preloader} from '../../../n1-main/m1-ui/Common/Preloader/Preloader';
import {GetCardsThunk, setCurrentPackAC} from '../../../n1-main/m2-bll/cards-reducer';
import {PackType} from '../../../API/ApiCardsPack';
import {DeletePackModal} from '../../../assets/ModalWindows/DeletePackModal';
import {UpdatePackModal} from '../../../assets/ModalWindows/UpdatePackModal';
import {AddNewPackProfileModal} from '../../../assets/ModalWindows/AddNewPackProfileModal';


export const Packs = () => {
    let dispatch = useDispatch();
    let packs = useSelector<AppStoreType, Array<PackType>>(state => state.packs.cardPacks);
    let [preloader, setPreloader] = useState(false);
    let user_id = useSelector<AppStoreType, string | null>(state => state.profile._id);

    let [showDeleteModal, setShowDeleteModal] = useState(false);
    let [idForModal, setIdForModal] = useState('');
    let [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
    let [showAddPackModal, setShowAddPackModal] = useState(false);


    const AddNewPack = () => {
        setShowAddPackModal(true);
    }
    const DeletePack = (id: string) => {
        setShowDeleteModal(true)
        setIdForModal(id)
        // dispatch(DeleteCardsPackThunk(id, setPreloader))
    }


    const GetCards = (id: string, cardsCount: number) => {
        dispatch(GetCardsThunk(id))
        if (cardsCount === 0) {
            // dispatch(AddNewCardThunk(id, setPreloader))
            // dispatch(CreatePackIdThunk(id))
        }
    }

    return (
        <div className={st.profilePage}>
            {showAddPackModal &&
            <AddNewPackProfileModal setAddNewCardModal={setShowAddPackModal} setPreloader={setPreloader}/>}
            {showDeleteModal && <DeletePackModal idForModal={idForModal} setShowDeleteModal={setShowDeleteModal}
                                                 setPreloader={setPreloader}/>}
            {showUpdateProfileModal &&
            <UpdatePackModal idForModal={idForModal} setShowUpdateProfileModal={setShowUpdateProfileModal}
                             setPreloader={setPreloader}/>}

            <Button children={'add new pack'} onClick={AddNewPack}/>
            <div className={st.profile}>{
                packs !== undefined ?
                    packs.map((pack) => {
                        const onLearnButtonClick = () => {
                            dispatch(setCurrentPackAC(pack));
                        }
                        const UpdatePack = (id: string) => {
                            setShowUpdateProfileModal(true)
                            setIdForModal(id)
                        }
                        return (
                            <div key={pack._id}>
                                <ul>
                                    <li>
                                        <div>ID: {pack._id}</div>
                                        <div>USER-ID: {pack.user_id}</div>
                                        <NavLink to={`${PATH.CARDS}/${pack._id}`} className={st.headerLink}>
                                            <div>NAME: {pack.name}</div>
                                        </NavLink>
                                        <div>CREATED: {pack.created}</div>
                                        <div>UPDATED: {pack.updated}</div>
                                        <div>cardsCount: {pack.cardsCount}</div>
                                        <p></p>
                                        <Button children={'Delete'} onClick={() => DeletePack(pack._id)}/>
                                        <Button children={'Update'} onClick={() => UpdatePack(pack._id)}/>

                                        <NavLink to={`${PATH.LEARN}/${pack._id}`} className={st.headerLink}>
                                            <Button
                                                children={'Learn'}
                                                onClick={onLearnButtonClick}/>
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








