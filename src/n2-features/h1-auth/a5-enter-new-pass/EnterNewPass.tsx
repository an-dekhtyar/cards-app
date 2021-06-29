import React from 'react';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import Input from '../../../n1-main/m1-ui/Common/Input/Input';


export const EnterNewPass = (props: EnterNewPassType) => {

    const {value, setValue, createNewPassword} = props

    const onClickHandler = () => {
        createNewPassword(value)
    }

    return (
        <>
            <h1>Create new password</h1>
            <Input value={value} onChangeText={setValue}/>
            <span>Create new password</span>
            <Button children={'Create new password'} onClick={onClickHandler}/>
        </>
    )
}

//Types
type EnterNewPassType = {
    value: string
    setValue: (value: string) => void
    createNewPassword: (value: string) => void
}