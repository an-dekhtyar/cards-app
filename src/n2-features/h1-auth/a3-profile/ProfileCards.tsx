import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {AddNewCardThunk, InitialCardProfileReducerType} from "../../../n1-main/m2-bll/profileCards-reducer";
import st from "./Profile.module.css";
import { Button } from '../../../n1-main/m1-ui/Common/Button/Button';


export let ProfileCards=()=>{
    let dispatch=useDispatch()
    let CardDataForTable = useSelector<AppStoreType, InitialCardProfileReducerType>(state => state.cardProfile)
    let [preloader, setPreloader] = useState(false)
    let AddNewCard=(CardsPackId:string)=>{
        console.log(CardsPackId)
        dispatch(AddNewCardThunk(CardsPackId,setPreloader))
    }
    return(
        <div >
            <h1 className={st.h1}>ProfileCards</h1>
            <p></p>
            <div >{
                CardDataForTable.cards!==[]?
                    CardDataForTable.cards.map((m) => {
                        return (
                            <div className={st.profile}>
                                <ul>
                                    <li>
                                        <div>ID: {m._id}</div>
                                        <div>USER-ID: {m.user_id}</div>
                                        <div>QUESTION: {m.question}</div>
                                        <div>ANSWER: {m.answer}</div>
                                        <div>CREATED: {m.created}</div>
                                        <div>UPDATED: {m.updated}</div>
                                        <p></p>
                                        <Button children={'AddNewCard'} onClick={() => AddNewCard(m.cardsPack_id)}/>

                                        {/*<Button children={'Delete'} onClick={() => DeleteCard(m._id)}/>*/}
                                        {/*<Button children={'Update'} onClick={() => UpdateCard(m._id)}/>*/}
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