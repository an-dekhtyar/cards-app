import React from 'react';
import st from './RestorePass.module.css';
import logo from '../assets/image/logo.png'
import {useDispatch, useSelector} from 'react-redux';

import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {CheckEmailNotify} from "./CheckEmailNotify";
import { SendInstruction } from './SendInstruction';
import {Preloader} from "../../../n1-main/m1-ui/Common/Preloader/Preloader";
import {getInstructionTC} from "../../../n1-main/m2-bll/restore-pass-reducer";




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
                <h2>IT-Incubator</h2>
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
