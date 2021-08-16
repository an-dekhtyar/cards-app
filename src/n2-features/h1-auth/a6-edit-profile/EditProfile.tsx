import React from "react";
import st from "./EditProfile.module.css"
import btn from "../../../n1-main/m1-ui/Common/Button/Button.module.css"
import { Input } from "../../../n1-main/m1-ui/Common/Input/Input";
import { useState } from "react";
import { Button } from "../../../n1-main/m1-ui/Common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { changeUserDataTC, toggleEditMode } from "../../../n1-main/m2-bll/profile-reducer";
import { AppStoreType } from "../../../n1-main/m2-bll/store";
import { Preloader } from "../../../n1-main/m1-ui/Common/Preloader/Preloader";


type EditProfileType = {
    userAvatar: string
    userName: string
    userEmail: string | null
    profileLogo: string
}

export const EditProfile = (props: EditProfileType) => {

    //props
    let { userAvatar, userName, userEmail, profileLogo } = props
    //hooks
    let dispatch = useDispatch()
    let isFetching = useSelector<AppStoreType, boolean>(state => state.app.isFetching)
    let [nickName, setNickName] = useState<string>(userName)
    let [avatar, setAvatar] = useState<string>(userAvatar)

    //callbacks
    const onChangeData = () => {
        dispatch(changeUserDataTC(nickName, avatar))
    }
    const onClickCancel = () => {
        dispatch(toggleEditMode(false))
    }




    return (
        <div className={st.general}>
            <div className={st.window}>
                <h2>Personal Information</h2>
                {!isFetching
                    ? <Preloader/>
                    :
                    <>
                        <div className={st.editProfileContent}>

                            <div className={st.logo}>
                                <img className={st.logo} alt={'avatar'}
                                     src={avatar === 'Avatar is not defined' || 'Add link to add ava!' ? profileLogo : avatar} />
                            </div>
                        </div>
                        <h3>{userEmail}</h3>
                        <div className={st.inputContainer}>
                            <label htmlFor={'userName'}>Nickname</label>
                            <Input value={nickName} onChangeText={setNickName} name={'userName'} />
                        </div>
                        <div className={st.inputContainer}>
                            <label htmlFor={'avatar'}>Avatar</label>
                            <Input value={avatar} onChangeText={setAvatar} name={'avatar'} />
                        </div>
                        <div className={st.buttonContainer}>
                            <Button className={btn.registrationCancel} children={'Cancel'} onClick={onClickCancel} />
                            <Button children={'Save'} onClick={onChangeData} />
                        </div>

                    </>
                }
            </div>
            <div onClick={onClickCancel} className={st.background}/>
        </div>
    )
};
