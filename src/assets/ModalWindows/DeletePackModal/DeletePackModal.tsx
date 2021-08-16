import React from 'react';
import styles from './DeletePackModal.module.css';
import {useDispatch} from "react-redux";
import { DeletePackThunk } from '../../../n1-main/m2-bll/packs-reducer';
import { Button } from '../../../n1-main/m1-ui/Common/Button/Button';


type propsType={
    setShowDeleteModal:(value:boolean)=>void;
    idForModal:string
}

export let DeletePackModal = (props:propsType) => {
    let dispatch=useDispatch()
    let showNoFoo=()=>{
        props.setShowDeleteModal(false)
    }
    let showYesFoo=()=>{
        dispatch(DeletePackThunk(props.idForModal))
        props.setShowDeleteModal(false)
    }
    return (
       <div className={styles.general}>
                <div className={styles.window}>
                    <h2>Do you want to delete pack?</h2>
                    <div className={styles.buttonContainer}>
                    <Button children={'No'} onClick={showNoFoo}/>
                    <Button children={'Yes'} onClick={showYesFoo} />
                    </div>
                </div>
                <div onClick={showNoFoo} className={styles.background}/>
            </div>
    )
}