import React from 'react';
import styles from './UpdateProfileModal.module.css'
import {Button} from '../../n1-main/m1-ui/Common/Button/Button';
import {useDispatch} from 'react-redux';
import {UpdatePackThunk} from '../../n1-main/m2-bll/packs-reducer';

type propsType = {
    setShowUpdateProfileModal: (value: boolean) => void;
    idForModal: string
    setPreloader: (value: boolean) => void;
}

export let UpdatePackModal = (props: propsType) => {
    let dispatch = useDispatch()
    let showNoFoo = () => {
        props.setShowUpdateProfileModal(false)
    }
    let showYesFoo = () => {
        dispatch(UpdatePackThunk(props.idForModal, props.setPreloader))
        props.setShowUpdateProfileModal(false)
    }
    return (
        <div className={styles.general}>
            <div className={styles.window}>
                <h1>Do you want to update Pack?</h1>
                <Button children={'No'} onClick={showNoFoo}/>
                <Button children={'Yes'} onClick={showYesFoo}/>
            </div>
            <div onClick={showNoFoo} className={styles.background}></div>
        </div>

    )
}