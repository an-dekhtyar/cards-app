import React, {useState} from 'react';
import st from './Profile.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {Preloader} from '../../../n1-main/m1-ui/Common/Preloader/Preloader';
import {GetCardsThunk, setCurrentPackAC} from '../../../n1-main/m2-bll/cards-reducer';
import {AddNewPackThunk, UpdatePackThunk} from '../../../n1-main/m2-bll/packs-reducer';
import {PackType} from '../../../API/ApiCardsPack';
import {DeletePackModal} from '../../../assets/ModalWindows/DeletePackModal';
import {UpdatePackModal} from '../../../assets/ModalWindows/UpdatePackModal';


export const Packs = () => {
    let dispatch = useDispatch();
    let packs = useSelector<AppStoreType, Array<PackType>>(state => state.packs.cardPacks);
    let [preloader, setPreloader] = useState(false);
    let user_id = useSelector<AppStoreType, string | null>(state => state.profile._id);

    let [showDeleteModal, setShowDeleteModal] = useState(false);
    let [idForModal, setIdForModal] = useState('');
    let [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);


    const AddNewPack = () => {
        if (user_id) {
            dispatch(AddNewPackThunk('asdasdas', setPreloader))
        }
    }
    const DeletePack = (id: string) => {
        setShowDeleteModal(true)
        setIdForModal(id)
        // dispatch(DeleteCardsPackThunk(id, setPreloader))
    }
    const UpdatePack = (id: string) => {
        console.log(id)
        setShowUpdateProfileModal(true)
        setIdForModal(id)
        dispatch(UpdatePackThunk(id, setPreloader))
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
            {showDeleteModal && <DeletePackModal idForModal={idForModal} setShowDeleteModal={setShowDeleteModal}
                                                 setPreloader={setPreloader}/>}
            {showUpdateProfileModal &&
            <UpdatePackModal idForModal={idForModal} setShowUpdateProfileModal={setShowUpdateProfileModal}
                             setPreloader={setPreloader}/>}

            <Button children={'add new pack'} onClick={AddNewPack}/>
            <div className={st.profile}>{
                packs !== undefined ?
                    packs.map((m) => {
                        const onLearnButtonClick = () =>{
                            dispatch(setCurrentPackAC(m));
                        }
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
                                        <Button children={'Delete'} onClick={() => DeletePack(m._id)}/>
                                        <Button children={'Update'} onClick={() => UpdatePack(m._id)}/>
                                        <NavLink to={PATH.CARDS} className={st.headerLink}>
                                            <Button
                                                children={'Show Cards'}
                                                onClick={() => GetCards(m._id, m.cardsCount)}/>
                                        </NavLink>
                                        <NavLink to={`${PATH.LEARN}/${m._id}`} className={st.headerLink}>
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








