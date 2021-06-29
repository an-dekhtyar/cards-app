import React from "react";

type CheckEmailNotifyType = {
    userEmail: string
}

export const CheckEmailNotify = (props: CheckEmailNotifyType) => {

    return (
        <>
            <span>Check Email</span>
            <span>We’ve sent an Email with instructions to {props.userEmail}</span>
        </>
    )
}