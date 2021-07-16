import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {useEffect, useState} from 'react';
import SuperRadio from '../../../n1-main/m1-ui/Common/Radio/SuperRadio';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    CardType,
    changeCardSearchParamsAC,
    GetCardsThunk,
    UpgradeCardGradeThunk
} from '../../../n1-main/m2-bll/cards-reducer';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {PackType} from '../../../API/ApiCardsPack';
import {Preloader} from '../../../n1-main/m1-ui/Common/Preloader/Preloader';


const getCard = (cards: Array<CardType>, curCard_id: string) => {
    if (cards.length === 1) {
        return cards[0];
    }
    const newCards = cards.filter(cards => cards._id !== curCard_id);
    const gradeCount = newCards.reduce((count, card) => {
        return count + (6 - card.grade) ** 2;
    }, 0);
    let rndNumber = gradeCount * Math.random();

    let i = 0;

    while (rndNumber > 0) {
        rndNumber = rndNumber - (6 - newCards[i].grade) ** 2;
        i++;
    }
    console.log(i - 1);
    return cards[i - 1];
}


export const Learn = () => {
    //state
    const dispatch = useDispatch();
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [value, setValue] = useState<string>('Did not know');
    const [curCard, setCurCard] = useState<CardType>({
        answer: '',
        answerImg: '',
        answerVideo: '',
        cardsPack_id: '',
        comments: '',
        created: '',
        grade: 3,
        more_id: '',
        question: 'no cards',
        questionImg: '',
        questionVideo: '',
        rating: 3,
        shots: 1,
        type: '',
        updated: '',
        user_id: '',
        __v: 1,
        _id: '1',
    });
    const grades = ['Did not know', 'Forgot', 'A lot of thoughts', 'Confused', 'Knew the answer'];
    const cards = useSelector<AppStoreType, Array<CardType>>(state => state.cards.cards);
    const pack = useSelector<AppStoreType, PackType>(state => state.cards.pack);
    const isFetching = useSelector<AppStoreType, boolean>(state => state.app.isFetching);
    const isInitialized = cards.length !== 0 && (cards[0].cardsPack_id === pack._id || pack._id === '');
    const location = useLocation();
    const pack_id = location.pathname.substring(7, location.pathname.length);

    useEffect(() => {
        dispatch(changeCardSearchParamsAC({pageCount: pack.cardsCount}))
        dispatch(GetCardsThunk(pack_id));
    }, []);

    useEffect(() => {
        setValue(grades[Math.round(curCard.grade) - 1])
    }, [curCard])
    const history = useHistory();

    if (curCard._id == '1') {
        if (isInitialized) {
            setCurCard(getCard(cards, curCard._id));
        }
    }
    //functions
    const onCancelButtonClick = () => {
        history.goBack();
    }

    const onShowAnswerButtonClick = () => {
        setShowAnswer(true);
    }
    const onOptionChange = (option: string) => {
        setValue(option);
    }
    const onNextButtonClick = () => {
        const newGrade = grades.indexOf(value) + 1;
        if (newGrade !== 0) {
            dispatch(UpgradeCardGradeThunk(curCard._id, newGrade));
        }
        setShowAnswer(false);
        setCurCard(getCard(cards, curCard._id));

    }
    return (
        !isFetching && !isInitialized ? <Preloader/> :
            <div>
                <h2>Learn '{pack.name ? pack.name : 'Pack Name'}'</h2>
                <p>Question: {curCard.question}</p>
                {
                    showAnswer && <p>Answer: {curCard.answer}</p>}
                {showAnswer && <div>
                    <SuperRadio value={value}
                                options={grades}
                                onChangeOption={onOptionChange}/>
                </div>}
                <Button onClick={onCancelButtonClick}>Cancel</Button>
                {!showAnswer ?
                    <Button disabled={cards.length === 0}
                            onClick={onShowAnswerButtonClick}>Show Answer</Button>
                    :
                    <Button onClick={onNextButtonClick}>Next</Button>}
            </div>
    )
}