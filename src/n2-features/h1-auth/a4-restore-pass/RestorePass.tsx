import React from 'react';
import st from './RestorePass.module.css';
import logo from '../assets/image/logo.png'
import loader from '../assets/image/loader.svg'
import {useDispatch, useSelector} from 'react-redux';
import {getInstructionTC} from '../../../n1-main/m2-bll/auth-reducer';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {CheckEmailNotify} from "./CheckEmailNotify";
import { SendInstruction } from './SendInstruction';


const mainLogo = {
    backgroundImage: `url(${logo})`,
}


export const RestorePass = () => {

    const dispatch = useDispatch()
    const userEmail = useSelector<AppStoreType, string>(state => state.restorePass.email)
    const isNotifySent = useSelector<AppStoreType, boolean>(state => state.restorePass.isNotifySent)
    const isFetching = useSelector<AppStoreType, boolean>(state => state.restorePass.isFetching)

    const getInstruction = (email: string) => {
        dispatch(getInstructionTC(email))
    }

    return (
        <div className={st.restorePass}>
            <div className={st.restorePassContain}>
                <div className={st.logo} style={mainLogo} />
                {isFetching
                    ? <div className={st.restorePassContent}>
                        {isNotifySent
                            ? <CheckEmailNotify userEmail={userEmail}/>
                            : <SendInstruction getInstruction={getInstruction}/>
                        }
                    </div>
                    : <Preloader/>}

            </div>
        </div>
    )
};

export const Preloader = () => {

    return (
        <div className={st.loader}>
            <img alt={'loading...'} src={loader}/>
        </div>
    )
}