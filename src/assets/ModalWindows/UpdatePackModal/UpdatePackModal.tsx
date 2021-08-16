import React, {KeyboardEvent, useState} from 'react';
import styles from './UpdatePackModal.module.css'

import {useDispatch, useSelector} from 'react-redux';
import { AppStoreType } from '../../../n1-main/m2-bll/store';
import { PackType } from '../../../API/ApiCardsPack';
import { UpdatePackThunk } from '../../../n1-main/m2-bll/packs-reducer';
import { Input } from '../../../n1-main/m1-ui/Common/Input/Input';
import { Button } from '../../../n1-main/m1-ui/Common/Button/Button';


type propsType = {
    setShowUpdateProfileModal: (value: boolean) => void;
    idForModal: string
    setPreloader: (value: boolean) => void;
}

export let UpdatePackModal = (props: propsType) => {
    let dispatch = useDispatch();
    const packName = useSelector<AppStoreType, PackType | undefined>(state=>state.packs.cardPacks.find(pack=>pack._id === props.idForModal))
    let [name, SetName] = useState(packName?packName.name:'');
    let showNoFoo = () => {
        props.setShowUpdateProfileModal(false)
    }
    let showYesFoo = () => {
        dispatch(UpdatePackThunk(props.idForModal, name))
        props.setShowUpdateProfileModal(false)
    }
    let onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            showYesFoo()
        }
    }
    return (
        <div className={styles.general}>
            <div className={styles.window}>
                <h1>Do you want to update Pack?</h1>
                <p></p>
                <div className={styles.inputContainer}>
                <label htmlFor={'name'}>Enter new pack name</label>
                <Input value={name} onChangeText={SetName} placeholder={'enter your pack name'}
                       onKeyPress={onKeyPressHandler}/>
                </div> 
                <div className={styles.buttonContainer}>
                <Button children={'No'} onClick={showNoFoo}/>
                <Button children={'Yes'} onClick={showYesFoo}/>
                </div>
            </div>
            <div onClick={showNoFoo} className={styles.background}/>
        </div>

    )
}