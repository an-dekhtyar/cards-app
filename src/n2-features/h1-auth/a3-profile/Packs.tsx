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
import bt from '../../../n1-main/m1-ui/Common/Button/Button.module.css';
import {SearchTableHeader} from '../../h2-cards/a1-search/SearchTableHeader';
import tableSt from './Cards.module.css';
import {DateHelper} from "../../../assets/helper/date-helper";

export const Packs = () => {
    let dispatch = useDispatch();
    let packs = useSelector<AppStoreType, Array<PackType>>(state => state.packs.cardPacks);
    let [preloader, setPreloader] = useState(false);
    let user_id = useSelector<AppStoreType, string | null>(state => state.profile._id);

    let [showDeleteModal, setShowDeleteModal] = useState(false);
    let [idForModal, setIdForModal] = useState('');
    let [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);



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

            {showDeleteModal && <DeletePackModal idForModal={idForModal} setShowDeleteModal={setShowDeleteModal}
                                                 setPreloader={setPreloader}/>}
            {showUpdateProfileModal &&
            <UpdatePackModal idForModal={idForModal} setShowUpdateProfileModal={setShowUpdateProfileModal}
                             setPreloader={setPreloader}/>}

            <div className={st.flexTable}>
                <SearchTableHeader/>
                {
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
                                <div key={pack._id} className={tableSt.row}>
                                    <NavLink to={`${PATH.CARDS}/${pack._id}`} className={st.headerLink}>
                                        <span>{pack.name}</span>
                                    </NavLink>
                                    <span>{pack.cardsCount}</span>
                                    <DateHelper date={pack.updated}/>
                                    <span>{pack.user_name}</span>
                                    <span>
                                { user_id === pack.user_id &&
                                <>
                                <Button children={'Delete'} red={true} className={bt.cardButton}
                                         onClick={() => DeletePack(pack._id)}/>
                                         <Button children={'Update'} className={bt.cardButton}
                                    onClick={() => UpdatePack(pack._id)}/>
                                </>
                                }
                                <NavLink to={`${PATH.LEARN}/${pack._id}`}>
                                    <Button
                                        className={bt.cardButton}
                                        children={'Learn'}
                                        onClick={onLearnButtonClick}/>
                                </NavLink>
                                </span>
                                </div>
                            )
                        })
                        :
                        <div>{preloader && <Preloader/>}</div>
                }</div>


            {/*<Table data={dataForTable.cardPacks}/>*/}
        </div>)
}








