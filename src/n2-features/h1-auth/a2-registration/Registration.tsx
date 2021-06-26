import React from 'react';
import st from './Registration.module.css'
import SuperInputText from "../../../n1-main/m1-ui/Common/Input/Input";
import {Button} from "../../../n1-main/m1-ui/Common/Button/Button";

export const Registration = () => (
    <div className={st.registrationPage}>
        <h1>REGISTRATION PAGE</h1>
        <SuperInputText/>
        <SuperInputText/>
        <SuperInputText/>

        <Button value={'Send'}/>
    </div>
);

