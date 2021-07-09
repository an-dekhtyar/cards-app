import React, {useState} from "react";
import {Input} from "../../../n1-main/m1-ui/Common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/Common/Button/Button";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/Routes/Routes";
import st from "./RestorePass.module.css"

export const SendInstruction = (props: SendInstructionType) => {

    const [value, setValue] = useState('')

    const onClickHandler = () => {
        props.getInstruction(value)
    }

    return (
        <>
            <h3>Forgot your password?</h3>
            <div className={st.inputContainer}>
                <Input placeholder={'Email'} value={value} onChangeText={setValue}/>
            </div>
            <span className={st.smallText}>Enter your email address and we will send you <br/> further instruction</span>
            <div className={st.buttonContainer}>
                <Button children={'Send Instructions'} onClick={onClickHandler}/>
            </div>
            <span>Did you remember your password?</span>
            <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
        </>
    )
}


//Types
type SendInstructionType = {
    getInstruction: (email: string) => void
}
