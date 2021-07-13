import React, {useEffect, useState} from 'react';
import st from './Profile.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {
    CardType,
    CreatePackIdThunk,
    GetCardsThunk,
    InitialCardProfileReducerType
} from '../../../n1-main/m2-bll/cards-reducer';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {Preloader} from '../../../n1-main/m1-ui/Common/Preloader/Preloader';
import {DeleteModal} from '../../../assets/ModalWindows/DeleteModal';
import {UpdateProfileModal} from '../../../assets/ModalWindows/UpdateProfileModal';
import {AddNewCardProfileModal} from '../../../assets/ModalWindows/AddNewCardProfileModal';
import {GETPacksThunk} from '../../../n1-main/m2-bll/packs-reducer';

export const Cards = () => {
    let dispatch = useDispatch()
    let cards = useSelector<AppStoreType, Array<CardType>>(state => state.cards.cards)
    let UserId = useSelector<AppStoreType, string | null>(state => state.profile._id)
    let [preloader, setPreloader] = useState(false)
    //for Modal===============================================================
    let [showDeleteModal, setShowDeleteModal] = useState(false)
    let [idForModal, setIdForModal] = useState('')

    let [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false)
    let [AddNewCardModal, setAddNewCardModal] = useState(false)


    useEffect(() => {
        console.log('useEffect')
        if (UserId) {
            dispatch(GetCardsThunk(UserId, setPreloader))
        }
    }, [])

    const AddNewCard = () => {
        setAddNewCardModal(true)
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
        // dispatch(UpdateCardsPackThunk(id, setPreloader))
    }

    return (
        <div className={st.profilePage}>
            <h1>PROFILE PAGE</h1>
            <Button children={'add new card'} onClick={AddNewCard}/>
            {showDeleteModal &&
            <DeleteModal setShowDeleteModal={setShowDeleteModal} idForModal={idForModal} setPreloader={setPreloader}/>}
            {showUpdateProfileModal &&
            <UpdateProfileModal setShowUpdateProfileModal={setShowUpdateProfileModal} idForModal={idForModal}
                                setPreloader={setPreloader}/>}
            {AddNewCardModal &&
            <AddNewCardProfileModal setAddNewCardModal={setAddNewCardModal} setPreloader={setPreloader}/>}
            <div className={st.profile}>{
                cards !== undefined ?
                    cards.map((m) => {
                        return (
                            <div>
                                <ul>
                                    <li>
                                        <div>ID: {m._id}</div>
                                        <div>USER-ID: {m.user_id}</div>
                                        <div>QUESTION: {m.question}</div>
                                        <div>ANSWER: {m.answer}</div>
                                        <div>CREATED: {m.created}</div>
                                        <div>UPDATED: {m.updated}</div>
                                        <p></p>
                                        <Button children={'Delete'} onClick={() => DeleteCard(m._id)}/>
                                        <Button children={'Update'} onClick={() => UpdateCard(m._id)}/>
                                        <NavLink to={PATH.CARDS} className={st.headerLink}>
                                        </NavLink>
                                    </li>
                                </ul>

                            </div>
                        )
                    })
                    :
                    <div>{preloader && <Preloader/>}</div>
            }</div>

            {/*<Table data={cards.cardPacks}/>*/}
        </div>)
}

//=============================================================================

// import React, {useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {AppStoreType} from '../../../n1-main/m2-bll/store';
// import {
//     AddNewCardThunk,
//     CreateCardsPackIdThunk,
//     DeleteCardsCardThunk,
//     InitialCardProfileReducerType,
//     UpdateCardsCardThunk
// } from "../../../n1-main/m2-bll/profileCards-reducer";
// import st from "./Profile.module.css";
// import { Button } from '../../../n1-main/m1-ui/Common/Button/Button';
// import {log} from "util";
// import {Redirect} from "react-router-dom";
// import {PATH} from "../../../n1-main/m1-ui/Routes/Routes";
// import {GETCardsPackThunk} from "../../../n1-main/m2-bll/cardsPack-reducer";
// import {GETCardsPackTC} from "../../../n1-main/m2-bll/search-reducer";
//
//
//
// /*
// * CARDS_PACK
// * [CARD, CARD] ===> CARDS_PACK_ID
// * */
//
// export let ProfileCards = ({}) => {
//     let dispatch = useDispatch()
//     let CardDataForTable = useSelector<AppStoreType, InitialCardProfileReducerType>(state => state.cardProfile)
//     const authUserId = useSelector<AppStoreType, string | null>(state => state.profile._id)
//     const cardsPackId = useSelector<AppStoreType, string | null>(state => state.cardProfile.currentCardsPackId)
//     //const Id = useSelector<AppStoreType, string | null>(state => state.profile.cardPacks[0]._id)
//
//
//     let [preloader, setPreloader] = useState(false)
//     // let cardsPack_id = useMemo(() => CardDataForTable.cards[0]?.cardsPack_id || null, [CardDataForTable.cards])
//     //let cardsPackId = CardDataForTable.cards[0]?.cardsPack_id || null;
//     let isYours = CardDataForTable.cards[0]?.user_id === authUserId;
//     console.log(authUserId,CardDataForTable.cards[0]?.cardsPack_id )
//     // let isYours = useMemo(() =>
//     //     CardDataForTable.cards[0]?.user_id && CardDataForTable.cards[0]?.user_id === authUserId,
//     //     [CardDataForTable.cards, authUserId])
//
//     let AddNewCard = () => {
//         console.log('AddNewCard')
//         // if (!cardsPack_id) return;
//         // dispatch(AddNewCardThunk(cardsPack_id, setPreloader))
//         if (cardsPackId) {
//             dispatch(AddNewCardThunk(cardsPackId, setPreloader))
//             // console.log()
//         } else {
//             //@ts-ignore
//             dispatch(CreateCardsPackIdThunk(Id))
//             dispatch(GETCardsPackTC(false))
//             // return <Redirect to={PATH.PROFILE}/>
//         }
//     }
//
//     let DeleteCardsCard = (id: string) => {
//         dispatch(DeleteCardsCardThunk(id, setPreloader))
//     }
//
//     const UpdateCard = (id: string) => {
//         dispatch(UpdateCardsCardThunk(id, setPreloader))
//
//     }
//
//     return (
//         <div>
//             <h1 className={st.h1}>ProfileCards</h1>
//             <p></p>
//             <Button children={'AddNewCard'} onClick={() => AddNewCard()} style={{color: isYours ? 'red' : 'green'}}/>
//             {/*<Button children={'AddNewCard'} disabled={!isYours} onClick={() => AddNewCard()} style={{color: isYours ? '': 'red'}}/>*/}
//             <div>{
//                 CardDataForTable.cards !== [] ?
//                     CardDataForTable.cards.map((m) => {
//                         return (
//                             <div className={st.profile}>
//
//                                 <ul>
//                                     <li>
//                                         <div>packUserId: {m.cardsPack_id}</div>
//                                         <div>ID: {m._id}</div>
//                                         <div>USER-ID: {m.user_id}</div>
//                                         <div>QUESTION: {m.question}</div>
//                                         <div>ANSWER: {m.answer}</div>
//                                         <div>CREATED: {m.created}</div>
//                                         <div>UPDATED: {m.updated}</div>
//                                         <p></p>
//                                         <Button children={'Delete'} onClick={() => DeleteCardsCard(m._id)}/>
//                                         <Button children={'Update'} onClick={() => UpdateCard(m._id)}/>
//                                         {/*<NavLink to={PATH.CARDS} className={st.headerLink}><Button*/}
//                                         {/*    children={'Show Cards'} onClick={() => GetCardsCard(m._id)}/></NavLink>*/}
//
//                                     </li>
//                                 </ul>
//
//                             </div>
//                         )
//                     })
//                     :
//                     <ul>
//                         <li>
//                         </li>
//                     </ul>
//
//             }</div>
//
//         </div>
//     )
// }