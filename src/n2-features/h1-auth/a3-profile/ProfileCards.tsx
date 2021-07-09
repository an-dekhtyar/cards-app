import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {
    AddNewCardThunk,
    DeleteCardsCardThunk,
    InitialCardProfileReducerType,
    UpdateCardsCardThunk
} from "../../../n1-main/m2-bll/profileCards-reducer";
import st from "./Profile.module.css";
import { Button } from '../../../n1-main/m1-ui/Common/Button/Button';
import {log} from "util";


export let ProfileCards=({})=>{
    let dispatch=useDispatch()
    let CardDataForTable = useSelector<AppStoreType, InitialCardProfileReducerType>(state => state.cardProfile)
    const authUserId = useSelector<AppStoreType, string | null>(state => state.login._id)

    let [preloader, setPreloader] = useState(false)
    // let cardsPack_id = useMemo(() => CardDataForTable.cards[0]?.cardsPack_id || null, [CardDataForTable.cards])
    let cardsPackId = CardDataForTable.cards[0]?.cardsPack_id || null;
    let isYours = CardDataForTable.cards[0]?.cardsPack_id === authUserId;
    console.log(authUserId,CardDataForTable.cards[0]?.cardsPack_id )
    // let isYours = useMemo(() =>
    //     CardDataForTable.cards[0]?.user_id && CardDataForTable.cards[0]?.user_id === authUserId,
    //     [CardDataForTable.cards, authUserId])

    let AddNewCard=()=>{
        // if (!cardsPack_id) return;
        // dispatch(AddNewCardThunk(cardsPack_id, setPreloader))
        if (cardsPackId) {
            dispatch(AddNewCardThunk(cardsPackId, setPreloader))
        };
    }

    let DeleteCardsCard=(id:string)=>{
        dispatch(DeleteCardsCardThunk(id,setPreloader))
    }

    const UpdateCard=(id:string)=>{
        dispatch(UpdateCardsCardThunk(id,setPreloader))

    }

    return(
        <div >
            <h1 className={st.h1}>ProfileCards</h1>
            <p></p>
            <Button children={'AddNewCard'} onClick={() => AddNewCard()} style={{color: isYours ? 'red': 'green'}}/>
            {/*<Button children={'AddNewCard'} disabled={!isYours} onClick={() => AddNewCard()} style={{color: isYours ? '': 'red'}}/>*/}
            <div >{
                CardDataForTable.cards!==[]?
                    CardDataForTable.cards.map((m) => {
                        return (
                            <div className={st.profile}>

                                <ul>
                                    <li>
                                        <div>packUserId: {m.cardsPack_id}</div>
                                        <div>ID: {m._id}</div>
                                        <div>USER-ID: {m.user_id}</div>
                                        <div>QUESTION: {m.question}</div>
                                        <div>ANSWER: {m.answer}</div>
                                        <div>CREATED: {m.created}</div>
                                        <div>UPDATED: {m.updated}</div>
                                        <p></p>
                                        <Button children={'Delete'} onClick={() => DeleteCardsCard(m._id)}/>
                                        <Button children={'Update'} onClick={() => UpdateCard(m._id)}/>
                                        {/*<NavLink to={PATH.CARDS} className={st.headerLink}><Button*/}
                                        {/*    children={'Show Cards'} onClick={() => GetCardsCard(m._id)}/></NavLink>*/}

                                    </li>
                                </ul>

                            </div>
                        )
                    })
                    :
                    <ul>
                        <li>
                        </li>
                    </ul>

            }</div>

        </div>
    )
}