import React, {KeyboardEvent, useState} from 'react';
import styles from './UpdateProfileModal.module.css'
import {Button} from '../../n1-main/m1-ui/Common/Button/Button';
import {useDispatch} from 'react-redux';
import {Input} from '../../n1-main/m1-ui/Common/Input/Input';
import {AddNewCardThunk} from '../../n1-main/m2-bll/cards-reducer';

type propsType = {
    setAddNewCardModal: (value: boolean) => void;
    setPreloader: (value: boolean) => void;
}

export let AddNewCardProfileModal = (props: propsType) => {
    let [name, SetName] = useState('')
    console.log(name)
    let dispatch = useDispatch()
    let showNoFoo = () => {
        props.setAddNewCardModal(false)
    }
    let showYesFoo = () => {
        dispatch(AddNewCardThunk(name, props.setPreloader))
        props.setAddNewCardModal(false)
    }
    let onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            showYesFoo()
        }
    }
    return (
        <div className={styles.general}>
            <div className={styles.window}>
                <h1>Do you want to Add new Card?</h1>
                <p></p>
                <Input value={name} onChangeText={SetName} placeholder={'enter your card name'}
                       onKeyPress={onKeyPressHandler}/>
                <p></p>
                <Button children={'No'} onClick={showNoFoo}/>
                <Button children={'Yes'} onClick={showYesFoo}/>
            </div>
            <div onClick={showNoFoo} className={styles.background}></div>
        </div>

    )
}