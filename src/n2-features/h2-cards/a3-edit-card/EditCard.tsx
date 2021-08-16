import React from "react";
import st from "./EditCard.module.css"
import btn from "../../../n1-main/m1-ui/Common/Button/Button.module.css"
import { Input } from "../../../n1-main/m1-ui/Common/Input/Input";
import { useState } from "react";
import { Button } from "../../../n1-main/m1-ui/Common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreType } from "../../../n1-main/m2-bll/store";
import { Preloader } from "../../../n1-main/m1-ui/Common/Preloader/Preloader";
import {toggleEditCardMode, UpdateCardThunk } from "../../../n1-main/m2-bll/cards-reducer";


type EditCardType = {
    cardId:string
    cardAnswer:string
    cardQuestion:string
}

export const EditCard = (props: EditCardType) => {

    //props
    let {cardId, cardAnswer, cardQuestion} = props
    //hooks
    let dispatch = useDispatch()
    let isFetching = useSelector<AppStoreType, boolean>(state => state.app.isFetching)
    let [newAnswer, setNewAnswer] = useState<string>(cardAnswer)
    let [newQuestion, setNewQuestion] = useState<string>(cardQuestion)

    //callbacks
    const onChangeData = () => {
        let card = {
            _id: cardId,
            answer: newAnswer,
            question: newQuestion
        }
        dispatch(UpdateCardThunk(card))
    }
    const onClickCancel = () => {
        dispatch(toggleEditCardMode(false))
    }



    return (
        <div className={st.general}>
            <div className={st.window}>
                <h2>Card Info</h2>
                {!isFetching
                    ? <Preloader/>
                    :
                    <>
                        <div className={st.editProfileContent}>


                        </div>

                        <div className={st.inputContainer}>
                            <label htmlFor={'Question'}>Question</label>
                            <Input value={newQuestion} onChangeText={setNewQuestion} name={'Question'} />
                            {/* <div className={st.attachFile}>+ Attach file</div> */}
                        </div>
                        <div className={st.inputContainer}>
                            <label htmlFor={'Answer'}>Answer</label>
                            <Input value={newAnswer} onChangeText={setNewAnswer} name={'Answer'} />
                            {/* <div className={st.attachFile}>+ Attach file</div> */}
                        </div>
                        <div className={st.buttonContainer}>
                            <Button className={btn.registrationCancel} children={'Cancel'} onClick={onClickCancel} />
                            <Button children={'Save'} onClick={onChangeData} />
                        </div>
                    </>
                }
            </div>
            <div onClick={onClickCancel} className={st.background}></div>
        </div>
    )
};
