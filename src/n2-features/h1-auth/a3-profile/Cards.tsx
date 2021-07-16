import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    CardType,
    changeCardSearchParamsAC,
    GetCardsThunk,
    toggleEditCardMode
} from '../../../n1-main/m2-bll/cards-reducer';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {NavLink, useLocation} from 'react-router-dom';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {Preloader} from '../../../n1-main/m1-ui/Common/Preloader/Preloader';
import {AddNewCardProfileModal} from '../../../assets/ModalWindows/AddNewCardProfileModal';
import {DeleteCardModal} from '../../../assets/ModalWindows/DeleteCardModal';
import {UpdateCardModal} from '../../../assets/ModalWindows/UpdateCardModal';
import st from './Cards.module.css'
import bt from './../../../n1-main/m1-ui/Common/Button/Button.module.css'
import {CardRating} from '../../h2-cards/a2-cards-rating/CardsRating';
import {EditCard} from '../../h2-cards/a3-edit-card/EditCard';
import {CardSearchBar} from '../../h2-cards/a1-search/search_cards/CardSearchBar';
import {CardPaginator} from '../../h2-cards/a1-search/search_cards/CardPaginator';
import {CardsPageCountSelect} from '../../h2-cards/a1-search/search_cards/CardsPageCountSelect';
import {CardSearchTableHeader} from '../../h2-cards/a1-search/search_cards/CardSearchTableHeader';
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {convertDate} from '../../../utils/Data-consversion';

export const Cards = () => {
    let dispatch = useDispatch()
    let cards = useSelector<AppStoreType, Array<CardType>>(state => state.cards.cards)
    let userId = useSelector<AppStoreType, string | null>(state => state.profile._id)
    let currentPackUserId = useSelector<AppStoreType, string>(state => state.cards.currentUserId)
    let [preloader, setPreloader] = useState(false)

    console.log('currentPackUserId', currentPackUserId)
    console.log('userId', userId)
    console.log('currentPackUserId', currentPackUserId === userId)
    let isUserPack = currentPackUserId === userId
    //get Pack_id===============================================================
    const location = useLocation();
    const pack_id = location.pathname.substring(7, location.pathname.length);
    useEffect(() => {
        dispatch(changeCardSearchParamsAC({pageCount: 10}))
        dispatch(GetCardsThunk(pack_id))
    }, []);
    //for Modal===============================================================
    let [showDeleteModal, setShowDeleteModal] = useState(false)
    let [idForModal, setIdForModal] = useState('')

    let [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false)
    let [AddNewCardModal, setAddNewCardModal] = useState(false)

    //EditCardMode---------------------------------------------------------------
    let editCardMode = useSelector<AppStoreType, boolean>(state => state.cards.editCardMode)

    let [cardId, setCardId] = useState('')
    let [cardAnswer, setCardAnswer] = useState('')
    let [cardQuestion, setCardQuestion] = useState('')


    /* useEffect(() => {
         console.log('useEffect')
         if (UserId) {
             dispatch(GetCardsThunk(UserId, setPreloader))
         }
     }, [])*/

    const AddNewCard = () => {
        setAddNewCardModal(true)

    }
    const updateCard = () => {
        dispatch(toggleEditCardMode(true))

    }
    console.log(editCardMode)

    return (
        <div className={st.cardsPage}>
            {editCardMode
                ?
                <EditCard cardId={cardId} cardAnswer={cardAnswer} cardQuestion={cardQuestion}/>
                :
                <div className={st.cardsContain}>
                    <div className={st.cardsTitle}>
                        <NavLink to={PATH.PROFILE}>
                            <button> ←</button>
                        </NavLink>
                        <span className={st.packName}>  Pack Name</span>
                    </div>
                    <div className={st.cardsSearch}>
                        <CardSearchBar/>
                        {isUserPack && <div><Button children={'add new card'} onClick={AddNewCard}/></div>}
                    </div>
                    {showDeleteModal &&
                    <DeleteCardModal setShowDeleteModal={setShowDeleteModal} idForModal={idForModal}
                                     setPreloader={setPreloader}/>}
                    {showUpdateProfileModal &&
                    <UpdateCardModal setShowUpdateProfileModal={setShowUpdateProfileModal} idForModal={idForModal}
                                     setPreloader={setPreloader}/>}
                    {AddNewCardModal &&
                    <AddNewCardProfileModal setAddNewCardModal={setAddNewCardModal} setPreloader={setPreloader}/>}

                    <div className={st.cardsTable}>
                        <CardSearchTableHeader/>
                        {
                            cards !== undefined ?
                                cards.map((card) => {
                                    const updatedDate = convertDate(card.updated)
                                    return (
                                        <Card
                                            key={card._id} cardId={card._id}
                                            cardUserId={card.user_id} userId={userId}
                                            answer={card.answer} question={card.question}
                                            created={card.created} updated={updatedDate}
                                            grade={card.grade} setCardId={setCardId}
                                            setCardAnswer={setCardAnswer} setCardQuestion={setCardQuestion}
                                            updateCard={updateCard}
                                        />
                                    )
                                })
                                :
                                <div>{preloader && <Preloader/>}</div>
                        }</div>

                    {/*<Table data={cards.cardPacks}/>*/}

                    <div className={st.cardsPagination}>
                        {cards.length !== 0 &&
                        <>
                            <CardPaginator/>
                            <CardsPageCountSelect/>
                        </>
                        }
                    </div>
                </div>}
        </div>)
}

type CardPropsType = {
    cardId: string
    cardUserId: string
    userId: string | null
    answer: string
    question: string
    created: string
    updated: string
    grade: number
    setCardId: (cardId: string) => void
    setCardAnswer: (answer: string) => void
    setCardQuestion: (question: string) => void
    updateCard: () => void
}


export const Card = (props: CardPropsType) => {

    let dispatch = useDispatch()
    let {
        cardId, cardUserId,
        userId, answer, question,
        created, updated, grade,
        setCardId, setCardAnswer, setCardQuestion, updateCard
    } = props

    let isUserCard = userId === cardUserId

    const deleteCard = (id: string) => {

        //setShowDeleteModal(true)
        //setIdForModal(id)
        // dispatch(DeleteCardsPackThunk(id, setPreloader))
    }
    const updateCardHandler = () => {
        setCardId(cardId)
        setCardAnswer(answer)
        setCardQuestion(question)
        updateCard()


        //setShowUpdateProfileModal(true)
        //setIdForModal(id)
        // dispatch(UpdateCardsPackThunk(id, setPreloader))
    }


    return (
        <div className={st.row}>
            <span>{question}</span>
            <span>{answer}</span>
            <span>{updated}</span>
            <span>
                <CardRating rate={grade}/>
            </span>
            {isUserCard &&
            <span className={st.cardButton}>
                    <Button red={true} className={bt.cardButton} children={'Delete'}/>
                    <Button className={bt.cardButton} children={'Update'} onClick={updateCardHandler}/>
                </span>
            }

        </div>
    )

}