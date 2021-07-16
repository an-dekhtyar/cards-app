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
import {CardSearchTableHeader} from '../../h2-cards/a1-search/search_cards/CardSearchTableHeader';
import {PATH} from '../../../n1-main/m1-ui/Routes/Routes';
import {DateHelper} from '../../../assets/helper/date-helper';
import backArrow from '../../../assets/images/back-arrow.png';
import {CardPaginator} from '../../h2-cards/a1-search/search_cards/CardPaginator';
import {CardsPageCountSelect} from '../../h2-cards/a1-search/search_cards/CardsPageCountSelect';

export const Cards = () => {
    let dispatch = useDispatch()
    let cards = useSelector<AppStoreType, Array<CardType>>(state => state.cards.cards)
    let packUserId = useSelector<AppStoreType, string>(state => state.cards.currentUserId)
    let userId = useSelector<AppStoreType, string | null>(state => state.profile._id)
    const isFetching = useSelector<AppStoreType, boolean>(state => state.app.isFetching);
    let currentPackUserId = useSelector<AppStoreType, string>(state => state.cards.currentCardsPackId)
    let [preloader, setPreloader] = useState(false)
    let [initialized, setInitialized] = useState(false);

    //get Pack_id===============================================================
    const location = useLocation();
    const pack_id = location.pathname.substring(7, location.pathname.length);
    useEffect(() => {
        dispatch(changeCardSearchParamsAC({pageCount: 10}))
        dispatch(GetCardsThunk(pack_id))
    }, []);

    if(!isFetching&&pack_id === currentPackUserId && !initialized){
        setInitialized(true);
    }

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
    let isUserPack = packUserId === userId



    const AddNewCard = () => {
        setAddNewCardModal(true)

    }
    const updateCard = () => {
        dispatch(toggleEditCardMode(true))

    }

    return (
        <div className={st.cardsPage}>
            {editCardMode
                ?
                <EditCard cardId={cardId} cardAnswer={cardAnswer} cardQuestion={cardQuestion}/>
                :
                <div className={st.cardsContain}>
                    <div className={st.cardsTitle}>
                        <NavLink to={PATH.PROFILE}>
                            <img className={st.backArrow} src={backArrow} alt={''}/>
                        </NavLink>
                        <span className={st.packName}>Pack Name</span>
                    </div>
                    <div className={st.cardsSearch}>
                        <CardSearchBar/>
                        {isUserPack && <div><Button children={'add new card'} onClick={AddNewCard}/></div>}
                    </div>
                    {showDeleteModal &&
                    <DeleteCardModal setShowDeleteModal={setShowDeleteModal} idForModal={cardId}/>}
                    {showUpdateProfileModal &&
                    <UpdateCardModal setShowUpdateProfileModal={setShowUpdateProfileModal} idForModal={idForModal}/>}
                    {AddNewCardModal &&
                    <AddNewCardProfileModal setAddNewCardModal={setAddNewCardModal} setPreloader={setPreloader}/>}
                    {initialized ?
                        <div className={st.cardsTable}>
                            <CardSearchTableHeader/>
                            {
                                cards !== undefined ?
                                    cards.map((card) => {

                                    return (
                                        <Card
                                            key={card._id} cardId={card._id} setShowDeleteModal={setShowDeleteModal}
                                            cardUserId={card.user_id} userId={userId}
                                            answer={card.answer} question={card.question}
                                            created={card.created} updated={card.updated}
                                            grade={card.grade} setCardId={setCardId}
                                            setCardAnswer={setCardAnswer} setCardQuestion={setCardQuestion}
                                            updateCard={updateCard}
                                        />
                                    )
                                })
                                :
                                <div>{preloader && <Preloader/>}</div>
                        }</div>
                        :
                        <Preloader/>}
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
    setShowDeleteModal:(showDeleteModal:boolean) => void
}


export const Card = (props: CardPropsType) => {

    let dispatch = useDispatch()
    let {
        cardId, cardUserId,
        userId, answer, question,
        created, updated, grade,setShowDeleteModal,
        setCardId, setCardAnswer, setCardQuestion, updateCard
    } = props

    let isUserCard = userId === cardUserId

    const deleteCard = (id: string) => {
        if(id) {
            setCardId(id)
            setShowDeleteModal(true)
        } }
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
            <DateHelper date={updated}/>
            <span>
                <CardRating rate={grade}/>
            </span>
            {isUserCard &&
            <span className={st.cardButton}>
                    <Button red={true} className={bt.cardButton} children={'Delete'} onClick={()=> deleteCard(cardId)}/>
                    <Button className={bt.cardButton} children={'Update'} onClick={updateCardHandler}/>
                </span>
            }

        </div>
    )

}