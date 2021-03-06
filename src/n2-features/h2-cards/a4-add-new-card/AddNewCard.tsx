import React from "react";
import st from "./AddNewCards.module.css"
import btn from "../../../n1-main/m1-ui/Common/Button/Button.module.css"
import { Input } from "../../../n1-main/m1-ui/Common/Input/Input";
import { useState } from "react";
import { Button } from "../../../n1-main/m1-ui/Common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { changeUserDataTC, toggleEditMode } from "../../../n1-main/m2-bll/profile-reducer";
import { AppStoreType } from "../../../n1-main/m2-bll/store";
import { Preloader } from "../../../n1-main/m1-ui/Common/Preloader/Preloader";


type AddNewCardType = {

}

export const AddNewCard = (props: AddNewCardType) => {

    //props
    let {  } = props
    //hooks
    let dispatch = useDispatch()
    let isFetching = useSelector<AppStoreType, boolean>(state => state.app.isFetching)
    // let [nickName, setNickName] = useState<string>(userName)
    // let [avatar, setAvatar] = useState<string>(userAvatar)

    //callbacks
    const onChangeData = () => {
        // dispatch(changeUserDataTC(nickName, avatar))
    }
    const onClickCancel = () => {
        dispatch(toggleEditMode(false))
    }

    return (
        <div className={st.editProfile}>
            <div className={st.editProfileContain}>
                <h2>Card Info</h2>
                {!isFetching
                    ? <Preloader/>
                    :
                    <>
                        <div className={st.editProfileContent}>


                        </div>

                        <div className={st.inputContainer}>
                            <label htmlFor={'Question'}>Question</label>
                            <Input value={'nickName'} onChangeText={()=>{}} name={'Question'} />
                            <div className={st.attachFile}>+ Attach file</div>
                        </div>
                        <div className={st.inputContainer}>
                            <label htmlFor={'Answer'}>Answer</label>
                            <Input value={'avatar'} onChangeText={()=>{}} name={'Answer'} />
                            <div className={st.attachFile}>+ Attach file</div>
                        </div>
                        <div className={st.buttonContainer}>
                            <Button className={btn.registrationCancel} children={'Cancel'} onClick={onClickCancel} />
                            <Button children={'Save'} onClick={onChangeData} />
                        </div>
                    </>
                }
            </div>
        </div>
    )
};
