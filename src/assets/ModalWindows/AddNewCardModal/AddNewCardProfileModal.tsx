import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../n1-main/m1-ui/Common/Button/Button';
import { Input } from '../../../n1-main/m1-ui/Common/Input/Input';
import { AddNewCardThunk } from '../../../n1-main/m2-bll/cards-reducer';
import st from './AddNewCardProfileModal.module.css'
import btn from '../../../n2-features/h1-auth/a2-registration/Registration.module.css'

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
    /*let onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            showYesFoo()
        }
    }*/
    return (
        <div className={st.general}>
            <div className={st.window}>
                <h2>Do you want to Add new Card?</h2>
    
                <div className={st.inputContainer}>
                    <label htmlFor={'Question'}>Question</label>
                    <Input value={newQuestion} onChangeText={setNewQuestion} name={'Question'} />
                    {/* <div className={st.attachFile}>+ Attach file</div> */}
                </div>
                <div className={st.inputContainer}>
                    <label htmlFor={'Answer'}>Answer</label>
                    <Input value={newAnswer} onChangeText={setNewAnswer} name={'Answer'} />
                   {/*  <div className={st.attachFile}>+ Attach file</div> */}
                </div>
                <div className={st.buttonContainer}>
                    <Button className={btn.registrationCancel} children={'Cancel'} onClick={showNoFoo} />
                    <Button children={'Add'} onClick={showYesFoo} />
                </div>
            </div>
            <div onClick={showNoFoo} className={st.background}/>
        </div>

    )
}