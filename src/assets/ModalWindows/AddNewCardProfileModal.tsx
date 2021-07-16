import React, {KeyboardEvent, useState} from 'react';
import styles from './AddNewCardProfileModal.module.css'
import {Button} from '../../n1-main/m1-ui/Common/Button/Button';
import {useDispatch} from 'react-redux';
import {Input} from '../../n1-main/m1-ui/Common/Input/Input';
import {AddNewCardThunk} from '../../n1-main/m2-bll/cards-reducer';
import st from "../../n2-features/h2-cards/a4-add-new-card/AddNewCards.module.css";
import btn from "../../n1-main/m1-ui/Common/Button/Button.module.css";

type propsType = {
    setAddNewCardModal: (value: boolean) => void;
    cardsPack_id:string
}

export let AddNewCardProfileModal = (props: propsType) => {

    let [newAnswer, setNewAnswer] = useState<string>('')
    let [newQuestion, setNewQuestion] = useState<string>('')
    let dispatch = useDispatch()
    let showNoFoo = () => {
        props.setAddNewCardModal(false)
    }




    let showYesFoo = () => {
        dispatch(AddNewCardThunk(props.cardsPack_id, newAnswer, newQuestion))
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
                <div className={st.inputContainer}>
                    <label htmlFor={'Question'}>Question</label>
                    <Input value={newQuestion} onChangeText={setNewQuestion} name={'Question'} />
                    <div className={st.attachFile}>+ Attach file</div>
                </div>
                <div className={st.inputContainer}>
                    <label htmlFor={'Answer'}>Answer</label>
                    <Input value={newAnswer} onChangeText={setNewAnswer} name={'Answer'} />
                    <div className={st.attachFile}>+ Attach file</div>
                </div>
                <p></p>
                <div className={st.buttonContainer}>
                    <Button className={btn.registrationCancel} children={'Cancel'} onClick={showNoFoo} />
                    <Button children={'Add'} onClick={showYesFoo} />
                </div>
            </div>
            <div onClick={showNoFoo} className={styles.background}></div>
        </div>

    )
}