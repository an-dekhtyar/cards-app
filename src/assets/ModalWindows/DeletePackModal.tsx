import React, {useMemo, useState} from 'react';
import styles from './AddNewCardProfileModal.module.css';
import {Button} from "../../n1-main/m1-ui/Common/Button/Button";
import {useDispatch} from "react-redux";
import {DeletePackThunk} from "../../n1-main/m2-bll/packs-reducer";

type propsType={
    setShowDeleteModal:(value:boolean)=>void;
    idForModal:string
    setPreloader:(value:boolean)=>void;
}

export let DeletePackModal = (props:propsType) => {
    let dispatch=useDispatch()
    let showNoFoo=()=>{
        props.setShowDeleteModal(false)
    }
    let showYesFoo=()=>{
        dispatch(DeletePackThunk(props.idForModal, props.setPreloader))
        props.setShowDeleteModal(false)
    }
    return (
       <div className={styles.general}>
                <div className={styles.window}>
                    <h1>Do you want to delete?</h1>
                    <Button children={'No'} onClick={showNoFoo}/>
                    <Button children={'Yes'} onClick={showYesFoo} />
                </div>
                <div onClick={showNoFoo} className={styles.background}></div>
            </div>

    )
}