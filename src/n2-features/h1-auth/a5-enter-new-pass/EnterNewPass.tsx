import { stdout } from 'process';
import React from 'react';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {Input} from '../../../n1-main/m1-ui/Common/Input/Input';
import st from './EnterNewPass.module.css'

export const EnterNewPass = (props: EnterNewPassType) => {

    const {value, setValue, createNewPassword} = props

    const onClickHandler = () => {
        createNewPassword(value)
    }

    return (
        <>
            <h3>Create new password</h3>
            <div className={st.inputContainer}>
                <Input type={'password'}placeholder={'Password'} value={value} onChangeText={setValue}/>
            </div>
            <span className={st.smallText}>Create new password and we will send you <br/>further instructions to email</span>
            <div className={st.buttonContainer}>
                <Button children={'Create new password'} onClick={onClickHandler}/>
            </div>
        </>
    )
}

//Types
type EnterNewPassType = {
    value: string
    setValue: (value: string) => void
    createNewPassword: (value: string) => void
}