import {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from '../../../../n1-main/m1-ui/Common/Input/Input';
import {changeCardSearchParamsAC, GetCardsThunk} from '../../../../n1-main/m2-bll/cards-reducer';
import {AppStoreType} from '../../../../n1-main/m2-bll/store';



export const CardSearchBar = () => {
    //state
    const dispatch = useDispatch();
    const cardQuestion = useSelector<AppStoreType, string>(state => state.cards.cardQuestion);
    const pack_id = useSelector<AppStoreType, string>(state => state.cards.currentCardsPackId);


    //functions
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCardSearchParamsAC({cardQuestion: e.currentTarget.value}));
        dispatch(GetCardsThunk(pack_id, value => {}))
    }

    return (
        <Input value={cardQuestion}
               placeholder={'Search...'}
               onChange={onInputChange}></Input>
    )
}