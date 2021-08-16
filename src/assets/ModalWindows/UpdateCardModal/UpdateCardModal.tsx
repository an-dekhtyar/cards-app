import React from 'react';
import styles from './UpdateCardModal.module.css'
import {useDispatch} from "react-redux";
import { UpdateCardThunk } from '../../../n1-main/m2-bll/cards-reducer';
import { Button } from '../../../n1-main/m1-ui/Common/Button/Button';


type propsType={
    setShowUpdateProfileModal:(value:boolean)=>void;
    idForModal:string

}

export let UpdateCardModal = (props:propsType) => {
    let dispatch=useDispatch()
    let showNoFoo=()=>{
        props.setShowUpdateProfileModal(false)
    }
    let showYesFoo=()=>{
        const card = { _id:props.idForModal}
        dispatch(UpdateCardThunk(card))
        props.setShowUpdateProfileModal(false)
    }
    return (
       <div className={styles.general}>
                <div className={styles.window}>
                    <h1>Do you want to update card?</h1>
                    <Button children={'No'} onClick={showNoFoo}/>
                    <Button children={'Yes'} onClick={showYesFoo} />
                </div>
                <div onClick={showNoFoo} className={styles.background}/>
            </div>

    )
}