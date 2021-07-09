import React from "react";
import checkEmailLogo from './../../../assets/images/checkEmail.png'
import st from './RestorePass.module.css'

type CheckEmailNotifyType = {
    userEmail: string
}
const img = {
    backgroundImage: `url(${checkEmailLogo})`,
}

export const CheckEmailNotify = (props: CheckEmailNotifyType) => {

    return (
        <>
            <div>
                <img src={checkEmailLogo}/>
            </div>
            <h3>Check Email</h3>
            <span>We’ve sent an Email with instructions to </span>
            <div className={st.email}>{props.userEmail}</div>
        </>
    )
}