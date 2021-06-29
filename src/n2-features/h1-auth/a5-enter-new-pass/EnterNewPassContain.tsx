import logo from "../assets/image/logo.png";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {Redirect, useLocation} from "react-router-dom";
import {setNewPassword} from "../../../n1-main/m2-bll/auth-reducer";
import st from "./EnterNewPass.module.css";
import {Preloader} from "../a4-restore-pass/RestorePass";
import {PATH} from "../../../n1-main/m1-ui/Routes/Routes";
import {EnterNewPass} from "./EnterNewPass";



export const EnterNewPassContain = () => {

    const mainLogo = {
        backgroundImage: `url(${logo})`
    }

    const [value, setValue] = useState('')
    const isNewPasswordSet = useSelector<AppStoreType, boolean>(state => state.restorePass.isNewPasswordSet)
    const isFetching = useSelector<AppStoreType, boolean>(state => state.restorePass.isFetching)
    const dispatch = useDispatch()
    const location = useLocation()

    let token = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

    const createNewPassword = (newPassword: string) => {
        dispatch(setNewPassword(newPassword, token))
    }

    return (


        <div className={st.enterNewPass}>
            <div className={st.enterNewPassContain}>
                <div className={st.logo} style={mainLogo}/>
                <div className={st.enterNewPassContent}>
                    {isFetching
                        ? <EnterNewPass value={value} setValue={setValue} createNewPassword={createNewPassword}/>
                        : <Preloader/>
                    }
                    {isNewPasswordSet && <Redirect to={PATH.LOGIN}/>}
                </div>

            </div>
        </div>


    )
}